import database from "infra/database.js";

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await clearDatabase();
});

test("POST MIGRATIONS ENDPOINT- [201]", async () => {
  const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST',
  });
  
  expect(res2.status).toBe(201);
  const res2Body = await res2.json();
  expect(Array.isArray(res2Body)).toBe(true);
  expect(res2Body.length).toBeGreaterThan(0);

});

test("POST MIGRATIONS ENDPOINT - [200]", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST',
  });
  
  expect(res.status).toBe(200);
  const resBody = await res.json();

  expect(Array.isArray(resBody)).toBe(true);
  expect(resBody.length).toBe(0);
});
