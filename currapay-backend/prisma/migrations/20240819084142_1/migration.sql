-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "deviceUsed" TEXT NOT NULL,
    "internetAccess" BOOLEAN NOT NULL,
    "mobilePenetration" REAL NOT NULL,
    "accountCreationDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TransactionTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "exchangeRate" REAL NOT NULL,
    "fees" REAL NOT NULL,
    "processingTime" INTEGER NOT NULL,
    "transferMethod" TEXT NOT NULL,
    "purposeOfTransfer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "TransactionTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");
