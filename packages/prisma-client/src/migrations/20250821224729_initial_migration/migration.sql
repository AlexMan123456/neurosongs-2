-- CreateTable
CREATE TABLE "public"."users" (
    "username" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "artistName" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "profilePicture" TEXT NOT NULL DEFAULT 'Default',
    "id" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "memberSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");
