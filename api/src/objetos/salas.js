const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerSalas() {
  try {
    let pool = await sql.connect(config);
    let salas = await pool.request().query(`SELECT ${db.CAMPOS_SALAS} FROM ${db.TABLAS.SALAS}`);
    return salas.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerSala(id) {
  try {
    let pool = await sql.connect(config);
    let sala = await pool.request().query(`SELECT ${db.CAMPOS_SALAS} FROM ${db.TABLAS.SALAS} WHERE id = '${id}'`);
    return sala.recordsets[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerSalas,
  obtenerSala,
};
