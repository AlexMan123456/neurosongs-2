-- CreateTable
CREATE TABLE "public"."songs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "source" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "album_index" INTEGER NOT NULL,
    "album_id" UUID NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."albums" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "front_cover" TEXT,
    "back_cover" TEXT,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."songs" ADD CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
