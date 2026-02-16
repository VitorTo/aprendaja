const URL_BASE = "http://localhost:3000";

function concatURL(path) {
  return `${URL_BASE}${path}`;
}

test("PUT MIGRATIONS ENDPOINT- [405]", async () => {
  const res2 = await fetch(concatURL("/api/v1/migrations"), {
    method: "PUT",
  });
  const res2Body = await res2.json();

  expect(res2.status).toBe(405);
  expect(res2Body.error).toBeDefined();
});

test("CHECK CONNECTIONS BD - [1]", async () => {
  const res = await fetch(concatURL("/api/v1/status"));
  const resBody = await res.json();

  expect(res.status).toBe(200);
  expect(resBody.dependencies.database.opened_connections).toBeDefined();
  expect(resBody.dependencies.database.opened_connections).toEqual(1);
});
