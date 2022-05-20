const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerUsuario(usuario) {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request().query(`SELECT ${db.CAMPOS_USUARIOS} FROM ${db.TABLAS.USUARIOS} WHERE usuario = '${usuario}'`);
    return user.recordsets[0];
  } catch (error) {
    return error;
  }
}

async function crearUsuario(usuario) {
  try {
    let pool = await sql.connect(config);
    console.log("CREAR USUARIO" + usuario.nombre);
    await pool.request().query(
      `INSERT INTO ${db.TABLAS.USUARIOS}
          VALUES(
            '${usuario.usuario}', '${usuario.contrasena}', '${usuario.nombre}', '${usuario.apellido}', 
            '${usuario.email}', '${usuario.fnac}'
          )`
    );
    return "OK";
  } catch (error) {
    return error;
  }
}

async function actualizarUsuario(usuario) {
  try {
    let pool = await sql.connect(config);
    console.log("UPDATE");
    await pool
      .request()
      .query(
        `UPDATE ${db.TABLAS.USUARIOS} SET nombre = '${usuario.nombre}', apellido = '${usuario.apellido}', fnac = '${usuario.fnac}', email = '${usuario.email}' WHERE usuario = '${usuario.usuario}'`
      );
    return `Usuario ${usuario.usuario} actualizado`;
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
};
