import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
});

export const sessionRelation = relations(sessionTable, ({}) => ({}));
