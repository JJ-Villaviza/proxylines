import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
});

export const accountRelation = relations(accountTable, ({}) => ({}));
