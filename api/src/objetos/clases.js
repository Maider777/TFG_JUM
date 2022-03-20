class Grupo {
  constructor(id, nombre, acronimo, imagen_url, descripcion, generoId, relevancia) {
    this.id = id;
    this.nombre = nombre;
    this.acronimo = acronimo;
    this.imagen_url = imagen_url;
    this.descripcion = descripcion;
    this.generoId = generoId;
    this.relevancia = relevancia;
  }
}

module.exports = { Grupo };
