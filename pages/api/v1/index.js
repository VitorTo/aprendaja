function status(req, res) {
  return res.status(200).json({ value: "tudo certo por aqui!" });
}

export default status;
