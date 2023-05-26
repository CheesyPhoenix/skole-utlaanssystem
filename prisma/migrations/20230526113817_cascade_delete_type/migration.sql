-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "addonTypeId" INTEGER NOT NULL,
    CONSTRAINT "Addon_addonTypeId_fkey" FOREIGN KEY ("addonTypeId") REFERENCES "AddonType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Addon" ("addonTypeId", "id") SELECT "addonTypeId", "id" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceTypeId" INTEGER NOT NULL,
    CONSTRAINT "Device_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("deviceTypeId", "id") SELECT "deviceTypeId", "id" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
