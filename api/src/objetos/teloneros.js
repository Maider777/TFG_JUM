const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerTeloneros() {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool.request().query(`SELECT ${db.CAMPOS_TELONEROS} FROM ${db.TABLAS.TELONEROS}`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerTelonero(id) {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_TELONEROS} FROM ${db.TABLAS.TELONEROS} WHERE id = '${id}'`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerTeloneros,
  obtenerTelonero,
};
