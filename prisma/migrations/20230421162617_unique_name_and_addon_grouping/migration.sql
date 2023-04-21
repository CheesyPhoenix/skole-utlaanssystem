/*
  Warnings:

  - You are about to drop the `_AddonToDeviceType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Addon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `DeviceType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addonTypeId` to the `Addon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AddonToDeviceType_B_index";

-- DropIndex
DROP INDEX "_AddonToDeviceType_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AddonToDeviceType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AddonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AddonTypeToDeviceType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AddonTypeToDeviceType_A_fkey" FOREIGN KEY ("A") REFERENCES "AddonType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AddonTypeToDeviceType_B_fkey" FOREIGN KEY ("B") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "addonTypeId" INTEGER NOT NULL,
    CONSTRAINT "Addon_addonTypeId_fkey" FOREIGN KEY ("addonTypeId") REFERENCES "AddonType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Addon" ("id") SELECT "id" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AddonType_name_key" ON "AddonType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonTypeToDeviceType_AB_unique" ON "_AddonTypeToDeviceType"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonTypeToDeviceType_B_index" ON "_AddonTypeToDeviceType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_name_key" ON "DeviceType"("name");
