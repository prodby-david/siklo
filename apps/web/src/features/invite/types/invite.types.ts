export interface OrganizerInviteSectionProps {
  groupId: string;
  inviteCode?: string | null;
  maxMembers: number;
  membershipsCount: number;
  isOrganizer?: boolean;
}
