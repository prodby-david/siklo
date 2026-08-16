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
  .refine(
    (data) =>
      (Boolean(data.referenceNumber) &&
        data.referenceNumber!.trim().length >= 3) ||
      (Boolean(data.proofUrl) && data.proofUrl!.trim().length > 0),
    {
      message:
        "Please provide either a reference number (min 3 chars) or upload a receipt image",
      path: ["referenceNumber"],
    },
  );

export type PaymentSubmissionInput = z.infer<typeof paymentSubmissionSchema>;
