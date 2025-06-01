import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { accountTable, companyTable, sessionTable, userImageTable } from ".";

export const branchTable = pgTable("branch", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),

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
    fields: [branchTable.id],
    references: [companyTable.admin],
  }),
  session: one(sessionTable, {
    fields: [branchTable.id],
    references: [sessionTable.accessBy],
  }),
  userImage: one(userImageTable, {
    fields: [branchTable.id],
    references: [userImageTable.accessBy],
  }),
}));
