import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInSchema, type SignInDTO } from './schema/signin.schema';
import type { Response } from 'express';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ('none' as const) : ('lax' as const),
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(data);

    res.cookie('access_token', user.accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', user.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
    };
  }

  @Post('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', cookieOptions);

    return {
      message: 'Logout successful',
    };
  }
}
