import { api } from "@/shared/lib/axios";

export interface NearestDuePayload {
  nextContributionAmount: number;
  nearestGroupName?: string;
  nearestGroupId?: string;
  dueGroupName?: string;
  dueGroupId?: string;
  nearestDueDate: string | null;
  activeGroupsCount: number;
  nextPayoutDate: string | null;
  nextPayoutAmount: number;
  nextPayoutGroupName: string;
  nextPayoutGroupId: string;
}

export async function fetchNearestDue(): Promise<NearestDuePayload> {
  const response = await api.get("/payments/nearest-due");
  return response.data;
}
