import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInSchema, type SignInDTO } from '@siklo/shared-schemas';
import type { Response } from 'express';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { getAccessTokenCookieOptions } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(data);
    const cookieOptions = getAccessTokenCookieOptions();

    res.cookie('access_token', user.accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
    };
  }

  @Post('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', getAccessTokenCookieOptions());

    return {
      message: 'Logout successful',
    };
  }
}
