import migrationsExecutor from "node-pg-migrate";
import database from "infra/database.js";
import { join } from "node:path";

const METHODS_ALLOWED = {
  GET: migrationsGet,
  POST: migrationsPost,
};

const defaultMigrationsOptions = {
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function executeMigrations({ dryRun = true }) {
  const dbClient = await database.getNewClient();

  const res = await migrationsExecutor({
    ...defaultMigrationsOptions,
    dbClient,
    dryRun: dryRun,
  });

  dbClient.end();

  return res;
}

export default async function handler(req, res) {
  const handlerMethod = METHODS_ALLOWED[req.method];
  if (!handlerMethod) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return handlerMethod(req, res);
}

async function migrationsGet(req, res) {
  const pendingMigrations = await executeMigrations({ dryRun: true });
  return res.status(200).json(pendingMigrations);
}

async function migrationsPost(req, res) {
  const migratedMigrations = await executeMigrations({ dryRun: false });
  const statusCode = migratedMigrations.length > 0 ? 201 : 200;

  return res.status(statusCode).json(migratedMigrations);
}
