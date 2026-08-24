import { z } from "zod";

const accountName = z
  .string()
  .trim()
  .max(100, "Account name cannot exceed 100 characters")
  .optional()
  .or(z.literal(""));

const accountNumber = z
  .string()
  .trim()
  .regex(/^\d{7,15}$/, "Account number must be 7 to 15 digits")
  .optional()
  .or(z.literal(""));

export const paymentAccountDetailsSchema = z
  .object({
    gcashName: accountName,
    gcashNumber: accountNumber,
    mayaName: accountName,
    mayaNumber: accountNumber,
    bankName: accountName,
    bankAccountNumber: accountNumber,
  })
  .superRefine((accounts, ctx) => {
    const hasUsableAccount = [
      accounts.gcashNumber,
      accounts.mayaNumber,
      accounts.bankAccountNumber,
    ].some((number) => number && number.trim().length > 0);

    if (!hasUsableAccount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Add at least one payment account number",
      });
    }
  });

export type PaymentAccountDetailsDTO = z.infer<
  typeof paymentAccountDetailsSchema
>;
