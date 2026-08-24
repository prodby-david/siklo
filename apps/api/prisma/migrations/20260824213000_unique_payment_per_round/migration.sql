-- CreateIndex
CREATE UNIQUE INDEX "Payment_groupId_roundId_userId_key" ON "Payment"("groupId", "roundId", "userId");
