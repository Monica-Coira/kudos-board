/*
  Warnings:

  - You are about to drop the column `giphyLink` on the `boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boards" DROP COLUMN "giphyLink",
ADD COLUMN     "image" TEXT;
