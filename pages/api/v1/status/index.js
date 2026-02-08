import database from "infra/database";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const version = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query({
    text: "SELECT count(1) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  const versionValue = version.rows[0].server_version;
  const maxConnectionsValue = maxConnections.rows[0].max_connections;
  const openedConnectionsValue = openedConnections.rows[0].count;

  return res.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: versionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: parseInt(openedConnectionsValue),
      },
    },
  });
}

export default status;
