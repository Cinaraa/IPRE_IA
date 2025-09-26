/*
  Warnings:

  - Added the required column `length` to the `Storyboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Storyboard" ADD COLUMN     "length" INTEGER NOT NULL;
