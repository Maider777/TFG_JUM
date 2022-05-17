const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerTeloneros() {
  try {
    let pool = await sql.connect(config);
    let teloneros = await pool.request().query(`SELECT ${db.CAMPOS_TELONEROS} FROM ${db.TABLAS.TELONEROS}`);
    return teloneros.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function obtenerTelonerosConcierto(id) {
  try {
    let pool = await sql.connect(config);
    let telonerosConcierto = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_TELONEROS} FROM ${db.TABLAS.TELONEROS} WHERE conciertoId = '${id}' ORDER BY fecha DESC`);
    return telonerosConcierto.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function obtenerConciertosTelonero(id) {
  try {
    let pool = await sql.connect(config);
    let conciertosTelonero = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_TELONEROS} FROM ${db.TABLAS.TELONEROS} WHERE artistaId = '${id}' ORDER BY fecha DESC`);
    return conciertosTelonero.recordsets[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerTeloneros,
  obtenerTelonerosConcierto,
  obtenerConciertosTelonero,
};
