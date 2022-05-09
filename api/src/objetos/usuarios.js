const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function crearUsuario(usuario) {
  try {
    let pool = await sql.connect(config);
    console.log("CREAR USUARIO" + usuario.usuario);
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

module.exports = {
  crearUsuario,
};
