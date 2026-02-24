const express = require("express");
const router = express.Router();

const ventas = [];

router.get("/", (req, res) => {
  res.json(ventas);
});

router.post("/", (req, res) => {
  const { producto, origen, comprador } = req.body;

  if (!producto || !origen || !comprador) {
    return res.status(400).json({ error: "Datos de venta incompletos" });
  }

  const venta = {
    id: Date.now(),
    fecha: new Date().toISOString(),
    producto,
    origen,
    comprador,
  };

  ventas.push(venta);

  res.status(201).json(venta);
});
module.exports = router;