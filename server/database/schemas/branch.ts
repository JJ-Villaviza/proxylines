import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { accountTable, companyTable, locationTable, sessionTable } from ".";

export const establishmentEnum = pgEnum("type", ["main", "branch"]);

export const branchTable = pgTable("branch", {
  id: uuid("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  type: establishmentEnum().notNull(),

  companyId: uuid("company_id").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const branchRelation = relations(branchTable, ({ one }) => ({
  account: one(accountTable, {
    fields: [branchTable.id],
    references: [accountTable.id],
  }),
  company: one(companyTable, {
    fields: [branchTable.companyId],
    references: [companyTable.id],
  }),
  location: one(locationTable, {
    fields: [branchTable.id],
    references: [locationTable.branchId],
  }),
  session: one(sessionTable, {
    fields: [branchTable.id],
    references: [sessionTable.branchId],
  }),
}));
