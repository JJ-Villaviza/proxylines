import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { branchTable } from ".";

export const companyTable = pgTable("company", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  businessName: text("business_name").notNull(),
  mission: text("mission"),
  vision: text("vision"),

  admin: text("admin").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const companyRelation = relations(companyTable, ({ many }) => ({
  branch: many(branchTable),
}));
