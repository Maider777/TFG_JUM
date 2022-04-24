const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");

async function obtenerArtistas() {
  try {
    let pool = await sql.connect(config);
    let grupos = await pool.request().query(`SELECT ${db.CAMPOS_ARTISTAS} FROM ${db.TABLAS.ARTISTAS}`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerArtista(id) {
  console.log("ID: " + id);
  try {
    let pool = await sql.connect(config);
    let grupos = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_ARTISTAS} FROM ${db.TABLAS.ARTISTAS} WHERE id = '${id}'`);
    return grupos.recordsets;
  } catch (error) {
    return error;
  }
}

async function crearArtista(artista) {
  try {
    let pool = await sql.connect(config);
    let id = helper.crearId();
    console.log("CREAR ARTISTA" + id);
    await pool.request().query(
      `INSERT INTO ${db.TABLAS.ARTISTAS}
        VALUES(
          '${id}', '${artista.nombre}', '${artista.acronimo}', '${artista.imagen_url}', 
          '${artista.descripcion}', '${artista.generos}', '${artista.relevancia}'
        )`
    );
    return "OK";
  } catch (error) {
    return error;
  }
}

async function eliminarArtista(id) {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`DELETE FROM ${db.TABLAS.ARTISTAS} WHERE id = '${id}'`);
    return "OK";
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerArtistas,
  obtenerArtista,
  crearArtista,
  eliminarArtista,
};
