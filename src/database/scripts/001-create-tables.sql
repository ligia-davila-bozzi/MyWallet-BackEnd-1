CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "sessions"(
  "id" SERIAL PRIMARY KEY,
  "token" TEXT NOT NULL,
  "userId" INTEGER NOT NULL
);

CREATE TABLE "wallet"(
  "id" SERIAL PRIMARY KEY,
  "description" TEXT NOT NULL,
  "value" NUMERIC NOT NULL,
  "date" DATE NOT NULL,
  "userId" INTEGER NOT NULL
);
