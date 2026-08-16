import { createGroupSchema as baseCreateGroupSchema } from "@siklo/shared-schemas";
import { z } from "zod";

export const createGroupSchema = baseCreateGroupSchema.extend({
  name: z
    .string({ message: "Group name is required" })
    .min(3, "Group name must be at least 3 characters long")
    .max(50, "Group name cannot exceed 50 characters"),
  description: z.string().optional(),
  contributionAmount: z
    .number({ message: "Contribution amount is required" })
    .int("Contribution amount must be a whole number without decimals")
    .min(50, "Contribution amount must be at least ₱50")
    .max(10000, "Contribution amount cannot exceed ₱10,000"),
  maxMembers: z
    .number({ message: "Member capacity is required" })
    .int("Member capacity must be a whole number")
    .min(3, "Member capacity must be at least 3 members")
    .max(15, "Member capacity cannot exceed 15 members"),
  cycleDuration: z
    .number({ message: "Cycle duration is required" })
    .int("Cycle duration must be a whole number")
    .min(1, "Cycle duration must be at least 1 cycle")
    .max(10, "Cycle duration cannot exceed 10 cycles"),
  gracePeriodDays: z
    .number({ message: "Grace period is required" })
    .min(0, "Grace period cannot be negative")
    .max(7, "Grace period is capped at 7 days maximum"),
  latePenaltyAmount: z
    .number({ message: "Daily late penalty is required" })
    .min(1, "Daily late penalty must be at least 1% per day")
    .max(10, "Daily late penalty rate cannot exceed 10% per day"),
  startDate: z.date().optional(),
  totalPayout: z.number().optional(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type CreateGroupData = CreateGroupInput;
