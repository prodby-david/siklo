import { z } from "zod";

export const paymentSubmissionSchema = z
  .object({
    paymentMethod: z.enum(["E_WALLET", "BANK_TRANSFER", "CASH"]),
    referenceNumber: z
      .string()
      .trim()
      .max(100, "Reference number cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),
    proofUrl: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "CASH") {
      if (!data.referenceNumber || data.referenceNumber.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Transaction reference number is required (min 3 characters)",
          path: ["referenceNumber"],
        });
      }
      if (!data.proofUrl || data.proofUrl.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Payment receipt or proof screenshot is required",
          path: ["proofUrl"],
        });
      }
    }
  });

export type PaymentSubmissionInput = z.infer<typeof paymentSubmissionSchema>;
