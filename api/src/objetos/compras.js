const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerCompras(usuario) {
  console.log("Obtener compras usuario: " + usuario);
  try {
    let pool = await sql.connect(config);
    let compras = await pool.request().query(`SELECT ${db.CAMPOS_COMPRAS} FROM ${db.TABLAS.COMPRAS} WHERE usuario = '${usuario}'`);
    return compras.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function insertarCompra(compra) {
  console.log(compra);
  try {
    let pool = await sql.connect(config);
    await pool.request().query(
      `INSERT INTO ${db.TABLAS.COMPRAS}
                VALUES(
                  '${compra.compraId}', '${compra.usuario}', '${compra.conciertoId}', '${compra.fecha}', '${compra.cantidad}', '${compra.precio}'
                )`
    );
    return "OK";
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  obtenerCompras,
  insertarCompra,
};
