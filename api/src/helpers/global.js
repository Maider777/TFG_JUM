var fs = require("fs"),
  request = require("request");

function crearId() {
  return Math.random().toString(36).substr(2, 22);
}

function crearError(error) {
  // No se devolvían bien los errores en el response, pero con esta función ya sí
  let nuevoError = new Error();
  nuevoError.stack = error.stack;
  nuevoError.message = error.message;
  return nuevoError;
}

function mostrarError(error) {
  console.log("MOSTRAR ERROR" + error);
  console.log("ERROR?" + error instanceof Error);
  for (const property in error) {
    console.log(`${property}: ${error[property]}`);
  }
}

function crearRespuesta(mensaje, data) {
  return {
    Respuesta: mensaje,
    Data: data,
  };
}

function descargarImagen(uri, filename, callback) {
  if (!fs.existsSync(filename)) {
    console.log("La imagen NO existe");
    //file exists
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
    return;
  }
}

module.exports = {
  crearId,
  crearError,
  descargarImagen,
  mostrarError,
  crearRespuesta,
};
