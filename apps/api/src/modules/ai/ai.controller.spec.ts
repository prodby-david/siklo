jest.mock('ai', () => ({
  generateText: jest.fn(),
  convertToModelMessages: jest.fn(),
  isStepCount: jest.fn(),
}));

jest.mock('@ai-sdk/google', () => ({
  google: jest.fn(),
}));

jest.mock('ollama-ai-provider-v2', () => ({
  createOllama: jest.fn(() => jest.fn()),
}));

jest.mock('./registry/ai-tools.registry', () => ({
  AiToolRegistry: jest.fn().mockImplementation(() => ({
    getTools: jest.fn().mockReturnValue({}),
  })),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma.service';

describe('AiController', () => {
  let controller: AiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        {
          provide: AiService,
          useValue: { handleMessage: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: { user: { findUnique: jest.fn() } },
        },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
