import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.getOrThrow<string>('REDIS_URL');

    this.logger.log(
      `Redis URL configured: ${redisUrl.replace(/\/\/.*@/, '//***@')}`,
    );

    this.logger.log(
      `Redis options: ${JSON.stringify({
        host: this.client.options.host,
        port: this.client.options.port,
        tls: !!this.client.options.tls,
      })}`,
    );

    this.client = new Redis(redisUrl, {
      maxRetriesPerRequest: 2,
    });

    this.client.on('error', (error) => {
      this.logger.error(`Redis connection error ${error.message}`);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.ping();
    this.logger.log('Redis client connected.');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
    this.logger.log('Redis client disconnected.');
  }
}
