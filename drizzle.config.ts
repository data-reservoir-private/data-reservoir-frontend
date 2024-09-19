import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/database/schema/*",
  out: "./src/database",
  strict: true,
  dialect: 'postgresql',
  migrations: {
    prefix: 'unix'
  },
  dbCredentials: {
    url: process.env.POSTGRES as string
  }
});