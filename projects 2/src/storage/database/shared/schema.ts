import { pgTable, varchar, jsonb, timestamp, index } from "drizzle-orm/pg-core"

export const healthCheck = pgTable("health_check", {
  id: require("drizzle-orm/pg-core").serial().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const molecules = pgTable(
  "molecules",
  {
    id: varchar("id", { length: 100 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    data: jsonb("data").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("molecules_name_idx").on(table.name),
    index("molecules_created_at_idx").on(table.created_at),
  ]
);

export const pageTemplates = pgTable(
  "page_templates",
  {
    id: varchar("id", { length: 100 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    data: jsonb("data").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("page_templates_name_idx").on(table.name),
    index("page_templates_created_at_idx").on(table.created_at),
  ]
);
