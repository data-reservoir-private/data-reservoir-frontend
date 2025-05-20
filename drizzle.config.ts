import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schemaFilter: [
    "cygnus",
    "farm_frenzy",
    "hayday",
    "master",
    "nasi_goreng",
    "pizza_frenzy",
    "quartz",
    "the_sims",
    "transaction",
    "transjakarta"
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL_POSTGRES!,
  },
});