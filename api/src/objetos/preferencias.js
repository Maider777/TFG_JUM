const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  helper = require("../helpers/global"),
  sql = require("mssql");

const tabla = "PREFERENCIAS";

async function obtenerPreferencias(usuario) {
  console.log("ID: " + usuario);
  try {
    let pool = await sql.connect(config);
    let grupos = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_PREFERENCIAS} FROM ${tabla} WHERE usuario = '${usuario}'`);
    return grupos.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function crearPreferencia(usuario, genero) {
  try {
    let pool = await sql.connect(config);
    let id = helper.crearId();
    console.log(id);
    await pool.request().query(`INSERT INTO ${tabla} VALUES('${id}', '${usuario}', '${genero}')`);
    return "OK";
  } catch (error) {
    return error;
  }
}

async function eliminarPreferencia(usuario, genero) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`DELETE FROM ${tabla} WHERE usuario = '${usuario}' AND generoId = '${genero}'`);
    return "OK";
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerPreferencias,
  crearPreferencia,
  eliminarPreferencia,
};
