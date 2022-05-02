const CAMPOS_ARTISTAS = "id, nombre, imagen_url, descripcion, generos, relevancia",
  CAMPOS_CONCIERTOS = "id, artistaId, salaId, fecha, precio_min, precio_max",
  CAMPOS_GENEROS = "id, nombre",
  CAMPOS_PREFERENCIAS = "usuario, artistaId",
  CAMPOS_SALAS = "id, nombre, direccion, lat, long, municipio, relevancia",
  CAMPOS_TELONEROS = "artistaId, conciertoId, fecha",
  CAMPOS_USUARIOS = "usuario, contrasena, nombre, apellido, email, fnac";

const TABLAS = {
  ARTISTAS: "artistas",
  CONCIERTOS: "conciertos",
  GENEROS: "generos",
  PREFERENCIAS: "preferencias",
  SALAS: "salas",
  TELONEROS: "teloneros",
  USUARIOS: "usuarios",
};

module.exports = {
  CAMPOS_ARTISTAS,
  CAMPOS_SALAS,
  CAMPOS_GENEROS,
  CAMPOS_CONCIERTOS,
  CAMPOS_PREFERENCIAS,
  CAMPOS_TELONEROS,
  CAMPOS_USUARIOS,
  TABLAS,
};
