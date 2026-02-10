-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ChannelStatus" AS ENUM ('PENDING', 'UPDATING', 'ACTIVE', 'NOT_FOUND', 'ERROR');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('CREATE', 'UPDATE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "status" "ChannelStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_info" (
    "id" UUID NOT NULL,
    "info" JSONB,
    "channel_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "channel_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_data" (
    "id" UUID NOT NULL,
    "data" JSONB,
    "playlist_type" TEXT,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "channel_id" UUID NOT NULL,
    "task_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "channel_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_task" (
    "id" UUID NOT NULL,
    "type" "TaskType" NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "channel_id" UUID NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "channel_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_channel" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "channel_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "channel_url_key" ON "channel"("url");

-- CreateIndex
CREATE INDEX "channel_url_status_idx" ON "channel"("url", "status");

-- CreateIndex
CREATE UNIQUE INDEX "channel_info_channel_id_key" ON "channel_info"("channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "channel_data_task_id_key" ON "channel_data"("task_id");

-- CreateIndex
CREATE INDEX "channel_data_channel_id_idx" ON "channel_data"("channel_id");

-- CreateIndex
CREATE INDEX "channel_task_channel_id_idx" ON "channel_task"("channel_id");

-- CreateIndex
CREATE INDEX "channel_task_status_idx" ON "channel_task"("status");

-- CreateIndex
CREATE INDEX "user_channel_user_id_idx" ON "user_channel"("user_id");

-- CreateIndex
CREATE INDEX "user_channel_channel_id_idx" ON "user_channel"("channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_channel_user_id_channel_id_key" ON "user_channel"("user_id", "channel_id");

-- AddForeignKey
ALTER TABLE "channel_info" ADD CONSTRAINT "channel_info_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_data" ADD CONSTRAINT "channel_data_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_data" ADD CONSTRAINT "channel_data_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "channel_task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_task" ADD CONSTRAINT "channel_task_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_channel" ADD CONSTRAINT "user_channel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_channel" ADD CONSTRAINT "user_channel_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
