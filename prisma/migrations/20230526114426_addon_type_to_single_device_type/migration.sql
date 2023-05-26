/*
  Warnings:

  - You are about to drop the `_AddonTypeToDeviceType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deviceTypeId` to the `AddonType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AddonTypeToDeviceType_B_index";

-- DropIndex
DROP INDEX "_AddonTypeToDeviceType_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AddonTypeToDeviceType";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AddonType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deviceTypeId" INTEGER NOT NULL,
    CONSTRAINT "AddonType_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AddonType" ("id", "name") SELECT "id", "name" FROM "AddonType";
DROP TABLE "AddonType";
ALTER TABLE "new_AddonType" RENAME TO "AddonType";
CREATE UNIQUE INDEX "AddonType_name_key" ON "AddonType"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
