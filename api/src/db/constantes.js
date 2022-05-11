const CAMPOS_ARTISTAS = "id, nombre, imagen_url, descripcion, generos, relevancia",
  CAMPOS_COMPRAS = "compraId, usuario, conciertoId, fecha, cantidad, precio",
  CAMPOS_CONCIERTOS = "id, artistaId, salaId, fecha, precio_min, precio_max",
  CAMPOS_TOKENS = "usuario, token",
  CAMPOS_PREFERENCIAS = "usuario, artistaId",
  CAMPOS_SALAS = "id, nombre, direccion, lat, long, municipio, relevancia",
  CAMPOS_TELONEROS = "artistaId, conciertoId, fecha",
  CAMPOS_USUARIOS = "usuario, contrasena, nombre, apellido, email, fnac";

const TABLAS = {
  ARTISTAS: "artistas",
  COMPRAS: "compras",
  CONCIERTOS: "conciertos",
  TOKENS: "tokens",
  PREFERENCIAS: "preferencias",
  SALAS: "salas",
  TELONEROS: "teloneros",
  USUARIOS: "usuarios",
};

module.exports = {
  CAMPOS_ARTISTAS,
  CAMPOS_COMPRAS,
  CAMPOS_CONCIERTOS,
  CAMPOS_TOKENS,
  CAMPOS_PREFERENCIAS,
  CAMPOS_SALAS,
  CAMPOS_TELONEROS,
  CAMPOS_USUARIOS,
  TABLAS,
};
