jest.mock('ai', () => ({
  tool: jest.fn((definition) => definition),
}));

jest.mock('@siklo/shared-schemas', () => ({
  createGroupSchema: { extend: jest.fn(() => ({})) },
}));

jest.mock('zod', () => ({
  z: { string: jest.fn(() => ({ optional: jest.fn(() => ({})) })) },
}));

import { prepareGroupCreationTool } from './create-group.tool';

describe('prepareGroupCreationTool', () => {
  it('prepares validated group details without creating a group', async () => {
    const input = {
      name: 'Family Siklo',
      contributionAmount: 1000,
      cycleDuration: 3,
      billingCycle: 'MONTHLY' as const,
      payoutSequence: 'MANUAL' as const,
      maxMembers: 3,
      allowedPaymentMethods: ['E_WALLET'] as const,
      gracePeriodDays: 0,
      latePenaltyAmount: 0,
    };
    const preparedTool = prepareGroupCreationTool() as unknown as {
      execute: (params: typeof input, options: unknown) => Promise<unknown>;
    };

    await expect(preparedTool.execute(input, {})).resolves.toEqual({
      action: 'CREATE_GROUP',
      requiresConfirmation: true,
      payload: input,
    });
  });
});
