/*
  Warnings:

  - A unique constraint covering the columns `[userId,sharedWithUserId]` on the table `Share` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Share_userId_sharedWithUserId_key" ON "Share"("userId", "sharedWithUserId");
