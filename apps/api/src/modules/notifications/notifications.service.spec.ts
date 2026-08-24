import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';
import { WebsocketService } from '../websocket/websocket.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: NotificationsRepository,
          useValue: {
            createNotification: jest.fn(),
            getUserNotification: jest.fn(),
            markNotificationRead: jest.fn(),
            markAllNotificationRead: jest.fn(),
          },
        },
        {
          provide: WebsocketService,
          useValue: {
            sendUserNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
