const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  helper = require("../helpers/global"),
  sql = require("mssql");

async function obtenerPreferencias(usuario) {
  console.log("ID: " + usuario);
  try {
    let pool = await sql.connect(config);
    let resp = await pool.request().query(`SELECT ${db.CAMPOS_PREFERENCIAS} FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}'`);
    if (resp.recordsets[0].length == 0) return new Error("El usuario no existe o no tiene preferencias");
    return resp.recordsets;
  } catch (error) {
    return error;
  }
}

async function preferenciaExiste(usuario, genero) {
  try {
    let pool = await sql.connect(config);
    let resp = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_PREFERENCIAS} FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}' AND generoId = '${genero}'`)
      .catch((error) => {
        throw error;
      });
    return resp.recordsets[0].length > 0;
  } catch (error) {
    return error;
  }
}

async function crearPreferencia(usuario, genero) {
  let existe = await preferenciaExiste(usuario, genero);
  if (existe instanceof Error) {
    return existe;
  }
  if (!existe)
    try {
      let pool = await sql.connect(config);
      let id = helper.crearId();
      await pool.request().query(`INSERT INTO ${db.TABLAS.PREFERENCIAS} VALUES('${id}', '${usuario}', '${genero}')`);
      return "OK";
    } catch (error) {
      return error;
    }
  return new Error("La preferencia ya existe");
}

async function eliminarPreferencia(usuario, genero) {
  try {
    let pool = await sql.connect(config);
    let resp = await pool.request().query(`DELETE FROM ${db.TABLAS.PREFERENCIAS} WHERE usuario = '${usuario}' AND generoId = '${genero}'`);
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
