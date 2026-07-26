import { createGroupSchema as baseCreateGroupSchema } from "@siklo/shared-schemas";
import { z } from "zod";

export const createGroupSchema = baseCreateGroupSchema.extend({
  contributionAmount: z
    .number({ message: "Contribution amount is required" })
    .int("Contribution amount must be a whole number without decimals")
    .min(1, "Contribution amount is required"),
  maxMembers: z
    .number({ message: "Maximum members is required" })
    .int("Maximum members must be a whole number")
    .min(3, "Minimum number of members is 3")
    .max(15, "Maximum number of members is 15"),
  cycleDuration: z
    .number({ message: "Cycle duration is required" })
    .int("Cycle duration must be a whole number")
    .min(1, "Cycle duration must be at least 1")
    .max(10, "Cycle duration cannot exceed 10"),
  startDate: z.date().optional(),
  totalPayout: z.number().optional(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type CreateGroupData = CreateGroupInput;
