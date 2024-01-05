import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInUserDto } from 'src/users/dto/signin-user-dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { User } from 'src/entity/User';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UNAUTHORIZED_ERROR_MESSAGE } from 'src/constants/error-messages';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';
import { authenticator } from 'otplib';

export type RequestUser = {
  id: number;
  email: string;
};

@Injectable()
export class AuthService {
  mfaSecret: string;
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {
    this.mfaSecret = process.env.MFA_SECRET;
  }

  async signin(dto: SignInUserDto): Promise<
    [
      {
        accessToken: string;
        refreshToken: string;
      },
      boolean,
      boolean,
    ]
  > {
    const user = await this.validateUserCredentials(dto);

    const payload = {
      id: user.id,
      email: user.email,
      mfa: user.mfa,
    };

    if (user.mfa) {
      if (!dto.token) {
        return [undefined, true, false];
      }

      if (
        !authenticator.verify({
          token: dto.token,
          secret: this.mfaSecret,
        })
      ) {
        return [undefined, false, false];
      }
    }

    const tokens = await this.tokenService.generateTokens(payload);
    await this.tokenService.saveTokenById(tokens.refreshToken, {
      id: user.id,
      type: 'refreshToken',
    });
    return [tokens, false, false];
  }

  async signup(dto: CreateUserDto) {
    let candidate = await this.usersService.findByEmail(dto.email);

    if (candidate)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const username = dto.email.split('@')[0];

    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });
    const payload = {
      id: user.id,
      email: user.email,
      mfa: user.mfa,
    };

    const tokens = await this.tokenService.generateTokens(payload);

    await this.tokenService.saveTokenById(tokens.refreshToken, {
      id: user.id,
      type: 'refreshToken',
    });

    await this.usersService.update(user.id, {
      username,
    });

    return { ...tokens };
  }

  async signout(refreshToken: string) {
    this.tokenService.deleteRefreshToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }

    const userData = await this.tokenService.validateRefreshtoken(refreshToken);
    const dbRefreshToken = await this.tokenService.findRefreshToken(
      refreshToken,
    );

    if (!userData || !dbRefreshToken) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }

    const payload = {
      id: userData.id,
      email: userData.email,
      mfa: userData.mfa,
    };

    const tokens = await this.tokenService.generateTokens(payload);
    await this.tokenService.saveTokenById(tokens.refreshToken, {
      id: userData.id,
      type: 'refreshToken',
    });

    return { ...tokens };
  }

  async verifyByEmail(confirmedHash: string, res: Response) {
    const user = await this.usersService.getUserByConfirmedHash(confirmedHash);

    if (user.confirmed) {
      return res.status(204).send({ message: 'User is already confirmed' });
    }

    await this.usersService.update(user.id, { confirmed: true });
    return res
      .status(200)
      .send({ messae: 'User has been successfully confirmed' });
  }

  async restorePassword(userId: number, dto: RestorePasswordDto) {
    return await this.changePassword(userId, dto);
  }

  async changeCurrentPassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.usersService.findOne(userId);
    const passwordIsValid = await bcrypt.compare(
      dto.current_password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'Current password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.changePassword(userId, dto);
    return { status: 200, message: 'Password was changed successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);
    this.checkIfUserExists(user);

    const payload = {
      id: user.id,
    };

    const { restoreToken } = await this.tokenService.generateRestoreToken(
      payload,
    );

    await this.mailService.sendEmail(
      this.mailService.getForgotPasswordEmailOptions(user.email, restoreToken),
      this.mailService.emailCallback,
    );

    return {
      statusCode: 200,
      message: 'The letter for password reset was successfully sent.',
    };
  }

  private async validateUserCredentials(dto: SignInUserDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      const passwordIsValid = await bcrypt.compare(dto.password, user.password);
      if (user && passwordIsValid) return user;
      this.throwErrorInvalidCredentials();
    } catch {
      this.throwErrorInvalidCredentials();
    }
  }

  private throwErrorInvalidCredentials() {
    throw new HttpException(
      'Incorrect email or password',
      HttpStatus.BAD_REQUEST,
    );
  }

  async changePassword(userId: number, dto: RestorePasswordDto) {
    this.checkPasswordMatch(dto.password, dto.confirm_password);

    const hashPassword = await bcrypt.hash(dto.password, 5);
    await this.usersService.update(userId, {
      password: hashPassword,
    });

    return {
      statusCode: 200,
      message: 'Password has been successfully changed',
    };
  }

  async checkPasswordMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
  }

  async checkIfUserExists(user: User) {
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
  }

  static async checkToken(token: string): Promise<boolean> {
    return (
      await axios.post(`${process.env.AUTH_URL}/checkToken`, {
        token,
      })
    ).data.result;
  }
}
