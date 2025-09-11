/*
  Warnings:

  - Added the required column `frame` to the `Storypoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Storypoint" ADD COLUMN     "frame" INTEGER NOT NULL;
