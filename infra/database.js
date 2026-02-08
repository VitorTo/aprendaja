import { Client } from "pg";

export default {
  query: query,
};

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const res = await client.query(queryObject);
    await client.end();
    return res;
  } catch (e) {
    console.error("[DATABASE] Error", e);
  } finally {
  }
}
