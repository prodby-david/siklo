import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '@/database/prisma.service';
import { TokenService } from '../token/token.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { user: { findUnique: jest.Mock } };
  let tokenService: { generateToken: jest.Mock };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    };

    tokenService = {
      generateToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: TokenService, useValue: tokenService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should throw UnauthorizedException if user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials. Please check and try again.',
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed-password',
      };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      jest
        .spyOn(service, 'comparePassword')
        .mockResolvedValue(false);

      await expect(service.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials. Please check and try again.',
      );
    });

    it('should return tokens on successful sign in', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed-password',
      };
      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'comparePassword')
        .mockResolvedValue(true);
      tokenService.generateToken.mockResolvedValue(mockTokens);

      const result = await service.signIn(signInDto);

      expect(result).toEqual(mockTokens);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: signInDto.email },
      });
      expect(service.comparePassword).toHaveBeenCalledWith(
        signInDto.password,
        mockUser.password,
      );
      expect(tokenService.generateToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
      );
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const password = 'password123';
      const result = await service.hashPassword(password);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).not.toBe(password);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'password123';
      const hash = await service.hashPassword(password);

      const result = await service.comparePassword(password, hash);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'password123';
      const hash = await service.hashPassword(password);

      const result = await service.comparePassword('wrongpassword', hash);
      expect(result).toBe(false);
    });
  });
});
