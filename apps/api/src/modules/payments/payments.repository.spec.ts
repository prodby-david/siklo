import { PaymentsRepository } from './payments.repository';
import { PrismaService } from '@/database/prisma.service';

describe('PaymentsRepository', () => {
  const findMany = jest.fn().mockResolvedValue([]);
  const update = jest.fn();
  const prisma = {
    payment: { findMany, update },
  } as unknown as PrismaService;
  const repository = new PaymentsRepository(prisma);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('selects only public user fields for pending payments', async () => {
    await repository.findPendingPaymentsByGroupId('group-1');

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          user: {
            select: { id: true, name: true, email: true },
          },
        }),
      }),
    );
  });

  it('records organizer approval as the verification source', async () => {
    update.mockResolvedValue({ id: 'payment-1', status: 'VERIFIED' });

    await repository.updatePaymentStatusVerified('payment-1');

    expect(update).toHaveBeenCalledWith({
      where: { id: 'payment-1' },
      data: {
        status: 'VERIFIED',
        verificationSource: 'ORGANIZER_APPROVED',
        verifiedAt: expect.any(Date),
      },
    });
  });
});
