import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { accountTable } from ".";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),

  accessBy: text("access_by").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const sessionRelation = relations(sessionTable, ({ one }) => ({
  account: one(accountTable, {
    fields: [sessionTable.accessBy],
    references: [accountTable.id],
  }),
}));
