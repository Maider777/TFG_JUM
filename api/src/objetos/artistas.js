const config = require("../db/dbconfig"),
  db = require("../db/constantes"),
  sql = require("mssql");
const { descargarImagen } = require("../helpers/global");

async function obtenerArtistas() {
  try {
    let i = 0;
    let pool = await sql.connect(config);
    let artistas = await pool.request().query(`SELECT ${db.CAMPOS_ARTISTAS} FROM ${db.TABLAS.ARTISTAS}`);
    artistas.recordsets[0].forEach((element) => {
      descargarImagen(element.imagen_url, `public/images/${element.id}.jpg`);
    });
    return artistas.recordsets;
  } catch (error) {
    return error;
  }
}

async function obtenerArtista(id) {
  console.log("ID: " + id);
  try {
    let pool = await sql.connect(config);
    let artista = await pool
      .request()
      .query(`SELECT ${db.CAMPOS_ARTISTAS} FROM ${db.TABLAS.ARTISTAS} WHERE id = '${id}'`);

    console.log(artista.recordsets[0][0].id);
    descargarImagen(artista.recordsets[0][0].imagen_url, `public/images/${id}.jpg`);
    return artista.recordsets[0];
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
