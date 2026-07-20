import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockJwtService = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
      decode: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should generate access and refresh tokens', async () => {
      jwtService.signAsync
        .mockResolvedValueOnce('mock-access-token')
        .mockResolvedValueOnce('mock-refresh-token');

      const result = await service.generateToken(
        'user-123',
        'test@example.com',
      );

      expect(result).toEqual({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(jwtService.signAsync).toHaveBeenNthCalledWith(
        1,
        { sub: 'user-123', email: 'test@example.com' },
        { secret: process.env.JWT_ACCESS_TOKEN, expiresIn: '1d' },
      );
      expect(jwtService.signAsync).toHaveBeenNthCalledWith(
        2,
        { sub: 'user-123', email: 'test@example.com' },
        { secret: process.env.JWT_REFRESH_TOKEN, expiresIn: '7d' },
      );
    });
  });

  describe('verifyToken', () => {
    it('should verify a token', async () => {
      const mockPayload = { sub: 'user-123', email: 'test@example.com' };
      jwtService.verifyAsync.mockResolvedValue(mockPayload);

      const result = await service.verifyToken('some-token');

      expect(result).toEqual(mockPayload);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('some-token');
    });
  });

  describe('decodeToken', () => {
    it('should decode a token', async () => {
      const mockPayload = { sub: 'user-123', email: 'test@example.com' };
      jwtService.decode.mockReturnValue(mockPayload);

      const result = await service.decodeToken('some-token');

      expect(result).toEqual(mockPayload);
      expect(jwtService.decode).toHaveBeenCalledWith('some-token');
    });
  });
});
