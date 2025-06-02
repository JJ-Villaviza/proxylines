import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schemas/*",
  out: "./server/databse/migration",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
