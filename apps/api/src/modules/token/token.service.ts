import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly token: JwtService) {}

  async generateToken(userId: string, email: string) {
    const payload = {
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

  async verifyToken(token: string) {
    return await this.token.verifyAsync(token);
  }

  async decodeToken(token: string) {
    return await this.token.decode(token);
  }
}
