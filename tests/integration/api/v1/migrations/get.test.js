import database from "infra/database.js";

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await clearDatabase();
});

test("GET MIGRATIONS ENDPOINT", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  
  expect(res.status).toBe(200);
  const resBody = await res.json();
  
  expect(Array.isArray(resBody)).toBe(true);
  expect(resBody.length).toBeGreaterThan(0);
});
