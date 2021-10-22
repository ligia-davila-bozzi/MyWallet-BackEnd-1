CREATE TABLE "purchases" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER NOT NULL,
  "product_id" INTEGER NOT NULL,
  CONSTRAINT "fk_purchases_customers" FOREIGN KEY("customer_id") REFERENCES "customers"("id"),
  CONSTRAINT "fk_purchases_products" FOREIGN KEY("product_id") REFERENCES "products"("id")
);
