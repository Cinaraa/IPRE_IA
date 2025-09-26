-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Storyboard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT,
    "imageReff" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Storyboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Storypoint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "storyboardId" INTEGER NOT NULL,
    "image" TEXT,
    "hasImage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Storypoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Storyboard" ADD CONSTRAINT "Storyboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Storypoint" ADD CONSTRAINT "Storypoint_storyboardId_fkey" FOREIGN KEY ("storyboardId") REFERENCES "public"."Storyboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
