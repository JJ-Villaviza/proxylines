import { bytea } from "@/lib/bytea";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { companyTable } from ".";

export const profileTable = pgTable("userImage", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size").notNull(),
  image: bytea("image").notNull(),
  table: text("table").notNull(),

  accountId: text("account_id").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const profileRelation = relations(profileTable, ({ many }) => ({
  company: many(companyTable),
}));
