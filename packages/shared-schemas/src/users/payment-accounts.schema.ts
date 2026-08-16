import { z } from "zod";

export const paymentAccountDetailsSchema = z.object({
  gcashName: z.string().optional(),
  gcashNumber: z.string().optional(),
  mayaName: z.string().optional(),
  mayaNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
});

export type PaymentAccountDetailsDTO = z.infer<
  typeof paymentAccountDetailsSchema
>;
