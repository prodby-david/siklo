import { PaymentsRepository } from './payments.repository';

export type GroupWithMembershipsAndRounds = Awaited<
  ReturnType<PaymentsRepository['findUserActiveGroupsWithMemberships']>
>[number];
