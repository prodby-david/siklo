import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './activity.repository';
import { PrismaService } from '@/database/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: ActivityRepository,
          useValue: {
            createActivity: jest.fn(),
            getGroupActivities: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            group: { findFirst: jest.fn(), findUnique: jest.fn() },
          },
        },
        {
          provide: WebsocketService,
          useValue: {
            broadcastActivity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

