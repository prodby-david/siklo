import { createGroupSchema as baseCreateGroupSchema } from "@siklo/shared-schemas";
import { z } from "zod";

export interface CreateGroupInput {
  name: string;
  description?: string;
  contributionAmount: number;
  cycleDuration: number;
  billingCycle: "DAILY" | "WEEKLY" | "BIMONTHLY" | "MONTHLY" | "QUARTERLY";
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  maxMembers: number;
  startDate?: Date;
  totalPayout?: number;
}

export interface CreateGroupData {
  name: string;
  description?: string;
  contributionAmount: number;
  cycleDuration: number;
  billingCycle: "DAILY" | "WEEKLY" | "BIMONTHLY" | "MONTHLY" | "QUARTERLY";
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  maxMembers: number;
  startDate?: Date;
}

export const createGroupSchema = baseCreateGroupSchema.extend({
  totalPayout: z.coerce.number().optional(),
}) as any;
