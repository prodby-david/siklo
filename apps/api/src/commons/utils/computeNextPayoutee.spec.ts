import { computeNextPayoutee } from './computeNextPayoutee';

describe('computeNextPayoutee', () => {
  const memberships = [
    { userId: 'u1', position: 1, user: { id: 'u1', name: 'Alice' } },
    { userId: 'u2', position: 2, user: { id: 'u2', name: 'Bob' } },
  ];

  it('returns the first unpaid round recipient in order', () => {
    const result = computeNextPayoutee({
      memberships,
      rounds: [
        {
          cycleNumber: 1,
          roundNumber: 1,
          recipientId: 'u1',
          targetDate: null,
          status: 'PAID',
        },
        {
          cycleNumber: 1,
          roundNumber: 2,
          recipientId: 'u2',
          targetDate: '2026-09-01T00:00:00.000Z',
          status: 'PENDING',
        },
      ],
    });

    expect(result).toMatchObject({
      userId: 'u2',
      name: 'Bob',
      cycleNumber: 1,
      roundNumber: 2,
    });
  });

  it('advances to the next cycle after earlier payouts complete', () => {
    const result = computeNextPayoutee({
      memberships,
      rounds: [
        {
          cycleNumber: 1,
          roundNumber: 2,
          recipientId: 'u2',
          targetDate: null,
          status: 'PAID',
        },
        {
          cycleNumber: 2,
          roundNumber: 1,
          recipientId: 'u1',
          targetDate: '2026-10-01T00:00:00.000Z',
          status: 'PENDING',
        },
      ],
    });

    expect(result).toMatchObject({
      userId: 'u1',
      cycleNumber: 2,
      roundNumber: 1,
    });
  });

  it('returns null when every payout is completed', () => {
    const result = computeNextPayoutee({
      memberships,
      rounds: [
        {
          cycleNumber: 1,
          roundNumber: 1,
          recipientId: 'u1',
          targetDate: null,
          status: 'PAID',
        },
      ],
    });

    expect(result).toBeNull();
  });
});
