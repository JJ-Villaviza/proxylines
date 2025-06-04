import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { branchTable } from ".";

export const accountTable = pgTable("account", {
  id: uuid("id").primaryKey(),
  password: text("password").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const accountRelation = relations(accountTable, ({ one }) => ({
  branch: one(branchTable, {
    fields: [accountTable.id],
    references: [branchTable.id],
  }),
}));
