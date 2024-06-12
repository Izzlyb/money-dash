
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id:           text("id").primaryKey(),
  plaidId:      text("plaid_id"),
  name:         text("name").notNull(),
  phone:        varchar("phone", { length: 256 }),
  email:        text("email"),
  password:     text("password"),
  userId:       text("user_id").notNull()
});

export const insertAccountsSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

