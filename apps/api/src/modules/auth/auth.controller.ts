import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInSchema, type SignInDTO } from '@siklo/shared-schemas';
import type { Response, Request } from 'express';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { getAccessTokenCookieOptions } from './auth.constants';
import { RateLimitService } from '@/infrastructure/rate-limit/rate-limit.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rateLimitService: RateLimitService,
  ) {}

  @Post('signin')
  async signIn(
    @Req() req: Request,
    @Body(new ZodValidationPipe(signInSchema)) data: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip = req.ip ?? 'unknown';

    await this.rateLimitService.checkLoginAllowed(ip);

    try {
      const user = await this.authService.signIn(data);

      const cookieOptions = getAccessTokenCookieOptions();

      res.cookie('access_token', user.accessToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return {
        message: 'Login successful',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        await this.rateLimitService.consumeLoginFailure(ip);
      }

      throw error;
    }
  }

  @Post('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', getAccessTokenCookieOptions());

    return {
      message: 'Logout successful',
    };
  }
}
