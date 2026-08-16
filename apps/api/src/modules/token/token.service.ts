import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly token: JwtService) {}

  async generateToken(userId: string, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };

    const accessToken = await this.token.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: '1d',
    });

    const refreshToken = await this.token.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return await this.token.verifyAsync<JwtPayload>(token);
  }

  async decodeToken(token: string): Promise<JwtPayload | null> {
    return await this.token.decode(token);
  }
}
