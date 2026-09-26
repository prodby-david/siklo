UPDATE "Payment" AS payment
SET "verificationSource" = CASE
  WHEN payment."userId" = payment_group."organizerId"
    THEN 'ORGANIZER_SELF_ATTESTED'::"PaymentVerificationSource"
  ELSE 'ORGANIZER_APPROVED'::"PaymentVerificationSource"
END
FROM "Group" AS payment_group
WHERE payment."groupId" = payment_group."id"
  AND payment."status" = 'VERIFIED'
  AND payment."verificationSource" IS NULL;
