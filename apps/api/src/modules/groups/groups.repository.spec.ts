import { PrismaService } from '@/database/prisma.service';
import { GroupsRepository } from './groups.repository';

describe('GroupsRepository', () => {
  let repository: GroupsRepository;
  let findFirst: jest.Mock;

  beforeEach(() => {
    findFirst = jest.fn();
    repository = new GroupsRepository({
      group: { findFirst },
    } as unknown as PrismaService);
  });

  describe('getGroupById', () => {
    it('should restrict the group query to the organizer or a member', async () => {
      findFirst.mockResolvedValue(null);

      await repository.getGroupById('group-1', 'user-1');

      expect(findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'group-1',
            OR: [
              { organizerId: 'user-1' },
              {
                memberships: {
                  some: { userId: 'user-1' },
                },
              },
            ],
          },
        }),
      );
    });
  });
});
