import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { User } from 'src/entity/User';
import { UsersService } from 'src/users/users.service';
import { getRepository, Repository } from 'typeorm';

type Payload = {
  id: number;
  email?: string;
};

type Options = {
  id: number;
  type: string;
};

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  private logger = new Logger(TokenService.name);

  async generateTokens(payload: Payload) {
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES || '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokenById(token: string, options: Options) {
    try {
      // const user = await this.usersService.findOne(options.id);
      // if (!user)
      //   throw new HttpException('User is not found', HttpStatus.NOT_FOUND);

      await this.usersService.update(options.id, {
        [options.type]: token,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRefreshToken(token: string) {
    const user = await this.userRepository.update(
      {
        refreshToken: token,
      },
      {
        refreshToken: '',
      },
    );

    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);

    console.log('user', user);
    return user;
  }

  async generateRestoreToken(payload: Payload) {
    const restoreToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_RESTORE_SECRET,
      expiresIn: process.env.JST_RESTORE_SECRET_EXPIRES || '10m',
    });
    return { restoreToken };
  }

  async validateRefreshtoken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async validateAcesstoken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findRefreshToken(refreshToken: string) {
    const user = await getRepository(User).find({
      where: {
        refreshToken,
      },
    });

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
