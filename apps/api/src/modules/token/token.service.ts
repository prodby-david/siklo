import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  sessionVersion: number;
}

@Injectable()
export class TokenService {
  constructor(private readonly token: JwtService) {}

  async generateAccessToken(userId: string, sessionVersion: number) {
    const payload: JwtPayload = {
      sub: userId,
      sessionVersion,
    };

    const accessToken = await this.token.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN,
      expiresIn: '1d',
    });

    return {
      accessToken,
    };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return await this.token.verifyAsync<JwtPayload>(token, {
      secret: process.env.JWT_ACCESS_TOKEN,
    });
  }
}
