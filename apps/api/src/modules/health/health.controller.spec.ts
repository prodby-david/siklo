import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns the application health status', () => {
    expect(new HealthController().check()).toEqual({ status: 'ok' });
  });
});
