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

import { AiService } from './ai.service';
import { AiToolRegistry } from './registry/ai-tools.registry';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: AiToolRegistry,
          useValue: { getTools: jest.fn().mockReturnValue({}) },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
