import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtRestorePasswordGuard } from 'src/guards/jwt-restore-password.guard';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { SignInUserDto } from 'src/users/dto/signin-user-dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  ACCESS_TOKEN_MAXAGE,
  REFRESH_TOKEN_MAXAGE,
} from 'src/constants/tokens-maxage';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { User } from 'src/entity/User';

@Controller('auth')
export class AuthController {
  mfaSecret: string;
  constructor(private authService: AuthService) {
    this.mfaSecret = process.env.MFA_SECRET;
  }

  @ApiBody({ type: SignInUserDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('/signin')
  async signin(@Body() dto: SignInUserDto, @Res() res: Response) {
    const [tokens, redirect, valid] = await this.authService.signin(dto);
    if (redirect) {
      return res.sendStatus(301);
    }

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: REFRESH_TOKEN_MAXAGE,
      httpOnly: true,
      secure: false,
    });

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: REFRESH_TOKEN_MAXAGE,
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json(tokens);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('/signup')
  async signup(@Body() dto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signup(dto);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: ACCESS_TOKEN_MAXAGE,
      httpOnly: true,
      secure: false,
    });

    res.cookie('accessToken', tokens.accessToken, {
      maxAge: REFRESH_TOKEN_MAXAGE,
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json(tokens);
  }

  @ApiResponse({ status: 200, type: ForgotPasswordDto })
  @Post('/forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Res() res: Response) {
    const response = await this.authService.forgotPassword(dto);
    return res.status(200).json(response);
  }

  @UseGuards(JwtRestorePasswordGuard)
  @Post('/restore-password')
  async restorePassword(
    @Req() req: Request,
    @Body() dto: RestorePasswordDto,
    @Res() res: Response,
  ) {
    const user = req['user'];
    const response = await this.authService.restorePassword(user.id, dto);
    return res.status(200).json(response);
  }

  @ApiResponse({ status: 200, type: ChangePasswordDto })
  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  async changePassword(
    @Req() req: Request,
    @Body() dto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    const user = req['user'];
    const response = await this.authService.changeCurrentPassword(user.id, dto);
    return res.status(200).json(response);
  }

  @ApiResponse({ status: 200 })
  @Post('/signout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    await this.authService.signout(refreshToken);
    return res.status(200).json({ message: 'Logout success!' });
  }

  @ApiResponse({ status: 200, type: VerifyEmailDto })
  @Post('/verify')
  verifyByEmail(
    @Query('confirmed_hash') confirmedHash: string,
    @Res() res: Response,
  ) {
    return this.authService.verifyByEmail(confirmedHash, res);
  }

  @ApiResponse({ status: 200 })
  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: ACCESS_TOKEN_MAXAGE,
      httpOnly: true,
    });
    res.cookie('refreshToken', tokens['refreshToken'], {
      maxAge: REFRESH_TOKEN_MAXAGE,
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json(tokens);
  }

  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/mfa/qr')
  async mfaQr(@Req() req: Request, @Res() res: Response) {
    const user = req['user'] as User;
    const uri = authenticator.keyuri(
      encodeURIComponent(user.email),
      encodeURIComponent('Mevoc'),
      this.mfaSecret,
    );

    toDataURL(uri, (err, imageUrl) => {
      if (err) {
        return res.status(500).send();
      }

      return res.status(200).json({
        url: imageUrl,
      });
    });
  }

  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/mfa/code')
  async mfaCode(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: { token: string },
  ) {
    return res.status(200).json({
      valid: authenticator.verify({
        token: body.token,
        secret: this.mfaSecret,
      }),
    });
  }
}
