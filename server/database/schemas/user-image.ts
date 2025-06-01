import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { branchTable } from ".";
import { bytea } from "../../lib/bytea";

export const userImageTable = pgTable("userImage", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size").notNull(),
  image: bytea("image").notNull(),

  accessBy: text("access_by").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const userImageRelation = relations(userImageTable, ({ one }) => ({
  branch: one(branchTable, {
    fields: [userImageTable.accessBy],
    references: [branchTable.id],
  }),
}));
