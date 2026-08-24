import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketGateway } from './websocket.gateway';
import { TokenService } from '../token/token.service';
import { WebsocketService } from './websocket.service';
import { PrismaService } from '@/database/prisma.service';

jest.mock('cookie', () => ({
  parseCookie: jest.fn(() => ({})),
}));

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketGateway,
        {
          provide: TokenService,
          useValue: { verifyAccessToken: jest.fn() },
        },
        {
          provide: WebsocketService,
          useValue: { setServer: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: { group: { findFirst: jest.fn() } },
        },
      ],
    }).compile();

    gateway = module.get<WebsocketGateway>(WebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
