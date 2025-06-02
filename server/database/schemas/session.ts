import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { branchTable } from ".";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),

  branchId: timestamp("branch_id", { withTimezone: true }).notNull(),

  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const sessionRelation = relations(sessionTable, ({ one }) => ({
  branch: one(branchTable, {
    fields: [sessionTable.branchId],
    references: [branchTable.id],
  }),
}));
