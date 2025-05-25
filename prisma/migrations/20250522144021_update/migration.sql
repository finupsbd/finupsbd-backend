-- CreateTable
CREATE TABLE "prompthHistory" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userPrompth" TEXT NOT NULL,
    "aiResponce" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompthHistory_pkey" PRIMARY KEY ("id")
);
