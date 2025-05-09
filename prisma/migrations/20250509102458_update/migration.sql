-- CreateTable
CREATE TABLE "TestApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TestApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestBasicInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestBasicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestContactInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestProfession" (
    "id" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "monthlyIncome" DOUBLE PRECISION NOT NULL,
    "testApplicationId" TEXT NOT NULL,

    CONSTRAINT "TestProfession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestBasicInfo_testApplicationId_key" ON "TestBasicInfo"("testApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TestContactInfo_email_key" ON "TestContactInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TestContactInfo_testApplicationId_key" ON "TestContactInfo"("testApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TestProfession_testApplicationId_key" ON "TestProfession"("testApplicationId");
