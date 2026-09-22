import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { SignInDTO } from '@siklo/shared-schemas';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(data: SignInDTO) {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials. Please check and try again.',
      );
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials. Please check and try again.',
      );
    }

    const tokens = await this.tokenService.generateAccessToken(
      user.id,
      user.sessionVersion,
    );

    return tokens;
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
