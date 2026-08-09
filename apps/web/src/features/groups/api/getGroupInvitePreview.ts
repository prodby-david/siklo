export interface GroupPreviewResponse {
  id: string;
  name: string;
  maxMembers: number;
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  memberships: {
    position: number;
  }[];
}
