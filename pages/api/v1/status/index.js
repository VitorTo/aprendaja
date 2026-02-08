import database from "../../../../infra/database";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  // console.log(result);
  console.log(result.rows[0]);
  return res.status(200).json({ value: "tudo certo por aqui!" });
}

export default status;
