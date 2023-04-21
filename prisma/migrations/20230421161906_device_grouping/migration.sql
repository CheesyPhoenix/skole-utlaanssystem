/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Addon` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Device` table. All the data in the column will be lost.
  - Added the required column `deviceTypeId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "DeviceType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AddonToDeviceType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AddonToDeviceType_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AddonToDeviceType_B_fkey" FOREIGN KEY ("B") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AddonToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AddonToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AddonToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Addon" ("id", "name") SELECT "id", "name" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceTypeId" INTEGER NOT NULL,
    CONSTRAINT "Device_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("id") SELECT "id" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToDeviceType_AB_unique" ON "_AddonToDeviceType"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToDeviceType_B_index" ON "_AddonToDeviceType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToOrder_AB_unique" ON "_AddonToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToOrder_B_index" ON "_AddonToOrder"("B");
