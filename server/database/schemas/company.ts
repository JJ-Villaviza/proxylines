import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const companyTable = pgTable("company", {
  id: text("id").primaryKey(),
});

export const companyRelation = relations(companyTable, ({}) => ({}));
