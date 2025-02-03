-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "readDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedDate" TIMESTAMP(3),
    "pageCount" INTEGER,
    "currentPage" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
