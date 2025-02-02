/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "readDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "pageCount" INTEGER,
    "currentPage" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
