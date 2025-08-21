/*
  Warnings:

  - You are about to drop the `_UserCourses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoProvider` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CourseLevel" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "public"."CourseStatus" AS ENUM ('draft', 'published', 'archived');

-- DropForeignKey
ALTER TABLE "public"."Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserCourses" DROP CONSTRAINT "_UserCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserCourses" DROP CONSTRAINT "_UserCourses_B_fkey";

-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "level" "public"."CourseLevel" NOT NULL DEFAULT 'beginner',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "public"."CourseStatus" NOT NULL DEFAULT 'published',
ADD COLUMN     "thumbUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."Lesson" ADD COLUMN     "durationSec" INTEGER,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "videoId" TEXT NOT NULL,
ADD COLUMN     "videoProvider" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "public"."_UserCourses";

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "public"."Course"("slug");

-- CreateIndex
CREATE INDEX "Lesson_courseId_order_idx" ON "public"."Lesson"("courseId", "order");

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
