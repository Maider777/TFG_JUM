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
  try {
    let pool = await sql.connect(config);
    let artista = await pool.request().query(`SELECT ${db.CAMPOS_ARTISTAS} FROM ${db.TABLAS.ARTISTAS} WHERE id = '${id}'`);

    console.log(artista.recordsets[0][0].id);
    descargarImagen(artista.recordsets[0][0].imagen_url, `public/images/${id}.jpg`);
    return artista.recordsets[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  obtenerArtistas,
  obtenerArtista,
};
