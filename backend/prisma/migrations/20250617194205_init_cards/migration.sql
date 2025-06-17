/*
  Warnings:

  - You are about to drop the `Boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Boards";

-- DropTable
DROP TABLE "Cards";

-- CreateTable
CREATE TABLE "boards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT,
    "giphyLink" TEXT,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "board_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "giphyLink" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "author" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
