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

  describe('generateAccessToken', () => {
    it('should generate an access token with the session version', async () => {
      jwtService.signAsync.mockResolvedValueOnce('mock-access-token');

      const result = await service.generateAccessToken('user-123', 2);

      expect(result).toEqual({
        accessToken: 'mock-access-token',
      });
      expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: 'user-123', sessionVersion: 2 },
        { secret: process.env.JWT_ACCESS_TOKEN, expiresIn: '1d' },
      );
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify an access token', async () => {
      const mockPayload = { sub: 'user-123', sessionVersion: 2 };
      jwtService.verifyAsync.mockResolvedValue(mockPayload);

      const result = await service.verifyAccessToken('some-token');

      expect(result).toEqual(mockPayload);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('some-token', {
        secret: process.env.JWT_ACCESS_TOKEN,
      });
    });
  });
});
