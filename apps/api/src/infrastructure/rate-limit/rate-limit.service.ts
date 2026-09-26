import { TooManyRequestsException } from '@/commons/exceptions/too-many-request-exception';
import { Injectable } from '@nestjs/common';
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RateLimitService {
  private readonly loginLimiter: RateLimiterRedis;

  constructor(redisService: RedisService) {
    this.loginLimiter = new RateLimiterRedis({
      storeClient: redisService.client,
      keyPrefix: 'rl:auth:login',
      points: 5,
      duration: 15 * 60,
    });
  }

  async checkLoginAllowed(identifier: string): Promise<void> {
    const result = await this.loginLimiter.get(identifier);

    if (result && result.consumedPoints >= 5) {
      const retryAfterSeconds = Math.ceil(result.msBeforeNext / 1000);

      throw new TooManyRequestsException(
        retryAfterSeconds,
        'Too many failed login attempts. Please try again later.',
      );
    }
  }

  async consumeLoginFailure(identifier: string): Promise<void> {
    try {
      await this.loginLimiter.consume(identifier);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      const result = error as RateLimiterRes;

      const retryAfterSeconds = Math.ceil(result.msBeforeNext / 1000);

      throw new TooManyRequestsException(
        retryAfterSeconds,
        'Too many login attempts. Please try again later.',
      );
    }
  }
}
