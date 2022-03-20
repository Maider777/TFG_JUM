const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

const tabla = "generos";

async function obtenerGeneros() {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool.request().query(`SELECT ${db.CAMPOS_GENEROS} FROM ${tabla}`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerGenero(id) {
  console.log("ID: " + id);
  try {
    let pool = await sql.connect(config);
    let grupos = await pool.request().query(`SELECT ${db.CAMPOS_GENEROS} FROM ${tabla} WHERE id = '${id}'`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerGeneros,
  obtenerGenero,
};
