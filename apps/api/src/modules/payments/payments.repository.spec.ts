import { PaymentsRepository } from './payments.repository';
import { PrismaService } from '@/database/prisma.service';

describe('PaymentsRepository', () => {
  const findMany = jest.fn().mockResolvedValue([]);
  const prisma = { payment: { findMany } } as unknown as PrismaService;
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
});
