const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerConciertos() {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool.request().query(`SELECT ${db.CAMPOS_CONCIERTOS} FROM ${db.TABLAS.CONCIERTOS}`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerConcierto(id) {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_CONCIERTOS} FROM ${db.TABLAS.CONCIERTOS} WHERE id = '${id}'`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerConciertosArtista(id) {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_CONCIERTOS} FROM ${db.TABLAS.CONCIERTOS} WHERE artistaId = '${id}'`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function crearConcierto(concierto) {
  try {
    let pool = await sql.connect(config);
    let id = helper.crearId();
    console.log(id);
    await pool.request().query(
      `INSERT INTO ${db.TABLAS.CONCIERTOS} 
        VALUES(
          '${id}', '${concierto.grupoId}', '${concierto.direccion}', '${concierto.lat}', '${concierto.long}', 
          '${concierto.municipio}', '${concierto.fecha}', '${concierto.precio_min}', '${concierto.precio_max}'
        )`
    );
    return "OK";
  } catch (error) {
    return error;
  }
}

async function eliminarConcierto(id) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`DELETE FROM ${db.TABLAS.CONCIERTOS} WHERE id = '${id}'`);
    return "OK";
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerConciertos,
  obtenerConcierto,
  obtenerConciertosArtista,
  crearConcierto,
  eliminarConcierto,
};
