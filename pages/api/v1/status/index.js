import database from "infra/database";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows[0]);

  return res.status(200).json({
    update_at: updateAt,
  });
}

export default status;
