import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const branchTable = pgTable("branch", {
  id: text("id").primaryKey(),
});

export const branchRelation = relations(branchTable, ({}) => ({}));
