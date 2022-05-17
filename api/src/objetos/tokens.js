const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerTokenUsuario(usuario) {
  console.log("Obtener login usuario: " + usuario);
  try {
    let pool = await sql.connect(config);
    let token = await pool.request().query(`SELECT ${db.CAMPOS_TOKENS} FROM ${db.TABLAS.TOKENS} WHERE usuario = '${usuario}'`);
    return token.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function insertarTokenUsuario(usuario, token) {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(`INSERT INTO ${db.TABLAS.TOKENS} VALUES('${usuario}', '${token}')`)
      .catch(function () {
        console.log("UPDATE");
        pool.request().query(`UPDATE ${db.TABLAS.TOKENS} SET token = '${token}' WHERE usuario = '${usuario}'`);
      });
    return "OK";
  } catch (error) {
    return error;
  }
}

async function eliminarTokenUsuario(usuario) {
  console.log("DELETE " + usuario);
  try {
    let pool = await sql.connect(config);
    resp = await pool.request().query(`DELETE FROM ${db.TABLAS.TOKENS} WHERE usuario = '${usuario}'`);
    return resp;
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerTokenUsuario,
  insertarTokenUsuario,
  eliminarTokenUsuario,
};
