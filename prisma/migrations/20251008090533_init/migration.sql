/*
  Warnings:

  - You are about to drop the column `frequency` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `frequencyId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "frequencyId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "nextBilling" DATETIME NOT NULL,
    "category" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Subscription" ("active", "category", "createdAt", "id", "name", "nextBilling", "price", "updatedAt") SELECT "active", "category", "createdAt", "id", "name", "nextBilling", "price", "updatedAt" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
