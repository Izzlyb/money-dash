import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";

config({ path: ".env"});

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_URL!,
  },
  verbose: true,
  strict: true
});

