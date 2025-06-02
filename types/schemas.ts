import * as schema from "@/database/schemas";

export type Account = typeof schema.accountTable.$inferSelect;
export type InsertAccount = typeof schema.accountTable.$inferInsert;

export type Branch = typeof schema.branchTable.$inferSelect;
export type InsertBranch = typeof schema.branchTable.$inferInsert;

export type Company = typeof schema.companyTable.$inferSelect;
export type InsertCompany = typeof schema.companyTable.$inferInsert;

export type Location = typeof schema.locationTable.$inferSelect;
export type InsertLocation = typeof schema.locationTable.$inferInsert;

export type Profile = typeof schema.profileTable.$inferSelect;
export type InsertProfile = typeof schema.profileTable.$inferInsert;

export type Session = typeof schema.sessionTable.$inferSelect;
export type InsertSession = typeof schema.sessionTable.$inferInsert;
