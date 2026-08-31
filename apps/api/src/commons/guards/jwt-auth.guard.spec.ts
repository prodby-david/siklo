import { UnauthorizedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma.service';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  const jwtService = { verifyAsync: jest.fn() };
  const prisma = { user: { findUnique: jest.fn() } };
  const guard = new JwtAuthGuard(
    jwtService as unknown as JwtService,
    prisma as unknown as PrismaService,
  );

  function createContext(accessToken?: string) {
    const request: {
      cookies: { access_token?: string };
      user?: unknown;
    } = { cookies: { access_token: accessToken } };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as ExecutionContext;

    return { context, request };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('accepts a token with the current session version', async () => {
    const { context, request } = createContext('access-token');
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      sessionVersion: 3,
    });
    prisma.user.findUnique.mockResolvedValue({ sessionVersion: 3 });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request.user).toEqual({ sub: 'user-1', sessionVersion: 3 });
  });

  it('rejects a token issued before the session version changed', async () => {
    const { context } = createContext('access-token');
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      sessionVersion: 2,
    });
    prisma.user.findUnique.mockResolvedValue({ sessionVersion: 3 });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects a request without an access token', async () => {
    const { context } = createContext();

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
