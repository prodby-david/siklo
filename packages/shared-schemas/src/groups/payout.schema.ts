import { z } from "zod";

export const requestAdvancePayoutSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  roundId: z.string().optional(),
  cycleNumber: z.number().int().positive().optional(),
  turnNumber: z.number().int().positive().optional(),
  accountDetails: z.string().min(3, "Receiving account details required"),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});

export const disbursePayoutSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  roundId: z.string().optional(),
  cycleNumber: z.number().int().positive().optional(),
  turnNumber: z.number().int().positive().optional(),
  referenceNumber: z.string().trim().max(100, "Reference number cannot exceed 100 characters").optional(),
  proofUrl: z.string().optional(),
});

export const confirmPayoutReceiptSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  roundId: z.string().optional(),
  cycleNumber: z.number().int().positive().optional(),
  turnNumber: z.number().int().positive().optional(),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});

export type RequestAdvancePayoutDTO = z.infer<typeof requestAdvancePayoutSchema>;
export type DisbursePayoutDTO = z.infer<typeof disbursePayoutSchema>;
export type ConfirmPayoutReceiptDTO = z.infer<typeof confirmPayoutReceiptSchema>;
