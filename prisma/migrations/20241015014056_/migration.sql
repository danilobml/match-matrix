/*
  Warnings:

  - The `relationshipWithId` column on the `RaSmorgasboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `relationshipWithName` on table `RaSmorgasboard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RaSmorgasboard" DROP COLUMN "relationshipWithId",
ADD COLUMN     "relationshipWithId" INTEGER,
ALTER COLUMN "relationshipWithName" SET NOT NULL;
