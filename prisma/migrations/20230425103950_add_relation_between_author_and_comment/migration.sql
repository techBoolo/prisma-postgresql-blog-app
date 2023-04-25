/*
  Warnings:

  - Added the required column `author_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
