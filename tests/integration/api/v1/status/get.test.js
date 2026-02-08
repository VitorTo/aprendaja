test("GET STATUS ENDPOINT", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  const resBody = await res.json();

  expect(resBody.updated_at).toBeDefined();

  const parseUpdateAt = new Date(resBody.updated_at).toISOString();
  expect(resBody.updated_at).toEqual(parseUpdateAt);

  const { version, max_connections, opened_connections } =
    resBody.dependencies.database;

  expect(version).toEqual("16.0");
  expect(max_connections).toEqual(100);
  expect(opened_connections).toEqual(1);
});
