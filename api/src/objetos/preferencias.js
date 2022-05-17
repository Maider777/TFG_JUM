const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  helper = require("../helpers/global"),
  sql = require("mssql");

async function obtenerPreferencias(usuario) {
  try {
    console.log("OBTENER PREFERENCIAS");
    console.log(usuario);
    let pool = await sql.connect(config);
    let resp = await pool.request().query(`SELECT ${db.CAMPOS_PREFERENCIAS} FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}'`);
    if (resp.recordsets[0].length == 0) return new Error("El usuario no existe o no tiene preferencias");
    return resp.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function crearPreferencia(usuario, artistaId) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`INSERT INTO ${db.TABLAS.PREFERENCIAS} VALUES('${usuario}', '${artistaId}')`);
    return "OK";
  } catch (error) {
    console.log(error);
    return error;
  }
  return new Error("La preferencia ya existe");
}

async function eliminarPreferencia(usuario, artistaId) {
  try {
    let pool = await sql.connect(config);
    let resp = await pool.request().query(`DELETE FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}' AND artistaId = '${artistaId}'`);
    console.log(`DELETE FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}' AND artistaId = '${artistaId}'`);
    return resp;
  } catch (error) {
    return error;
  }
}

async function eliminarPreferencias(usuario) {
  try {
    let pool = await sql.connect(config);
    let resp = await pool.request().query(`DELETE FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}'`);
    return resp;
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerPreferencias,
  crearPreferencia,
  eliminarPreferencia,
  eliminarPreferencias,
};
