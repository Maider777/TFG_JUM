/**
 * Api base utilizada https://github.com/Deagle50/dam_proyecto_final/blob/master/CoctelpediaApiRest/app.js
 * Api utilizada para JWT https://asfo.medium.com/autenticando-un-api-rest-con-nodejs-y-jwt-json-web-tokens-5f3674aba50e
 *
 * Conexion string
 * Server=185.60.40.210\\SQLEXPRESS,58015;User Id=sa;Password=Pa88word;
 */

const { mostrarError, crearError, crearRespuesta } = require("./src/helpers/global");

const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  app = express(),
  sql = require("mssql"),
  config = require("./src/db/dbconfig"),
  cors = require("cors"),
  fs = require("fs"),
  artistas = require("./src/objetos/artistas"),
  compras = require("./src/objetos/compras"),
  conciertos = require("./src/objetos/conciertos"),
  tokens = require("./src/objetos/tokens"),
  preferencias = require("./src/objetos/preferencias"),
  salas = require("./src/objetos/salas"),
  usuarios = require("./src/objetos/usuarios"),
  teloneros = require("./src/objetos/teloneros");

app.set("llave", config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.listen((puerto = 6745), () => {
  console.log(`Servidor iniciado en el puerto ${puerto}`);
});
app.get("/", function (req, res) {
  res.json({ message: "recurso de entrada" });
});

var dir = "./public/images";

if (!fs.existsSync(dir)) {
  console.log("El directorio img no existe, creado");
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Headers with authentication:
 * Accept application/json
 * Content-Type application/json
 * access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjQ3MjUxMDA3LCJleHAiOjE2NDcyNTI0NDd9.1PU7Z3SbbTgstrF5k5lh0D4xzZAs2UkSpLu5dobhiN0
 */
const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("llave"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" }).status(401);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401);
    res.send({
      mensaje: "No autorizado.",
    });
  }
});

/**
 * LOGIN:
 * Headers:
 * Content-Type application/json
 *
 * x-www-form-urlencoded
 * usuario: xxxx
 * contrasena: xxxx
 */
app.post("/login", (req, res) => {
  console.log(req.body.usuario, req.body.contrasena);
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    request.query(`SELECT * FROM usuarios where usuario = '${req.body.usuario}' AND contrasena = '${req.body.contrasena}'`, function (err, response) {
      if (err) {
        res.send(err);
        console.log(err);
      }
      if (response.recordset.length > 0) {
        const payload = { check: true };
        const token = jwt.sign(payload, app.get("llave"), {
          expiresIn: 86660,
        });
        res.json({
          mensaje: "Autenticación correcta",
          token: token,
        });
      } else {
        request.query(`SELECT * FROM usuarios where usuario = '${req.body.usuario}'`, function (err) {
          if (err) {
            res.send(err);
            console.log(err);
          }
          if (response.recordset.length > 0) {
            res.json({ mensaje: "Usuario o contraseña incorrectos" });
          }
          res.json({ mensaje: "El usuario no existe" });
        });
      }
    });
  });
});

// Usuario
app.get("/usuarios/:usuario", rutasProtegidas, (req, res) => {
  usuarios
    .obtenerUsuario(req.params.usuario)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.json(crearError(data)).status(404);
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/registro", (req, res) => {
  usuarios
    .crearUsuario(req.body)
    .then((data) => {
      if (data instanceof Error) {
        res.status(401).json(crearError(data));
        return;
      }
      res.json(data).status(201);
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

// TOKENS
app.get("/tokens/:usuario", (req, res) => {
  tokens
    .obtenerTokenUsuario(req.params.usuario)
    .then((data) => {
      console.log(data);
      if (!data || data[0].length == 0) {
        res.status(404);
        return;
      }
      res.json(data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/tokens/", (req, res) => {
  console.log("INTENTO DE POST DE TOKEN");
  tokens
    .insertarTokenUsuario(req.body.usuario, req.body.token)
    .then((data) => {
      if (data instanceof Error) {
        res.status(401).json(crearError(data));
        return;
      }
      res.json(data).status(201);
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

app.delete("/tokens/:usuario", (req, res) => {
  tokens
    .eliminarTokenUsuario(req.params.usuario)
    .then((data) => {
      if (data.rowsAffected == 0) {
        res.json(crearError(new Error("El usuario no tiene token guardado"))).status(404);
      } else {
        let respuesta = crearRespuesta("Token eliminado correctamente", data);
        res.json(respuesta).status(204);
      }
    })
    .catch((error) => {
      res.json(crearError(error)).status(401);
    });
});

// COMPRAS
app.get("/compras/:usuario", rutasProtegidas, (req, res) => {
  compras
    .obtenerCompras(req.params.usuario)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/compras/", rutasProtegidas, (req, res) => {
  let compra = {
    compraId: req.body.compraId,
    usuario: req.body.usuario,
    conciertoId: req.body.conciertoId,
    fecha: req.body.fecha,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
  };
  console.log("INTENTO DE POST DE COMPRAS");
  compras
    .insertarCompra(compra)
    .then((data) => {
      if (data instanceof Error) {
        res.status(401).json(crearError(data));
      }
      res.json(data).status(201);
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

// ARTISTAS
app.get("/artistas/", (req, res) => {
  artistas
    .obtenerArtistas()
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404);
      }
      res.json(data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/artistas/:id", (req, res) => {
  artistas
    .obtenerArtista(req.params.id)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404);
        return;
      }
      res.json(data[0]);
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });
});

// CONCIERTOS
app.get("/conciertos/", (req, res) => {
  conciertos.obtenerConciertos().then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
      return;
    }
    res.json(data[0]);
  });
});

app.get("/conciertos/:id", (req, res) => {
  conciertos.obtenerConcierto(req.params.id).then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
      return;
    }
    res.json(data[0]);
  });
});

app.get("/conciertosArtista/:id", (req, res) => {
  conciertos.obtenerConciertosArtista(req.params.id).then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
      return;
    }
    res.json(data[0]);
  });
});

// PREFERENCIAS
app.get("/preferencias/:id", rutasProtegidas, (req, res) => {
  preferencias
    .obtenerPreferencias(req.params.id)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/preferencias/", rutasProtegidas, (req, res) => {
  console.log("INTENTO DE POST DE PREFERENCIAS");
  preferencias
    .crearPreferencia(req.body.usuario, req.body.artistaId)
    .then((data) => {
      if (data instanceof Error) {
        res.json(crearError(data)).status(401);
        return;
      }
      res.json(data).status(201);
    })
    .catch((error) => {
      res.json(crearError(error)).status(404);
    });
});

app.delete("/preferencias/", rutasProtegidas, (req, res) => {
  preferencias
    .eliminarPreferencia(req.body.usuario, req.body.artistaId)
    .then((data) => {
      if (data.rowsAffected == 0) {
        res.json(crearError(new Error("La preferencia no existe"))).status(404);
        return;
      } else res.json(data).status(201);
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

app.delete("/preferencias/:id", rutasProtegidas, (req, res) => {
  preferencias
    .eliminarPreferencias(req.params.id)
    .then((data) => {
      if (data.rowsAffected == 0) {
        res.json(crearError(new Error("El usuario no tiene preferencias"))).status(404);
        return;
      } else {
        let respuesta = crearRespuesta("Preferencias eliminadas correctamente", data);
        res.json(respuesta).status(204);
      }
    })
    .catch((error) => {
      res.json(crearError(error)).status(401);
    });
});

// SALAS
app.get("/salas/:id", (req, res) => {
  salas
    .obtenerSala(req.params.id)
    .then((data) => {
      if (data instanceof Error) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data[0]);
    })
    .catch((error) => {
      res.json(error);
    });
});

// TELONEROS
app.get("/teloneros/", (req, res) => {
  console.log("OBTENER TELONEROS");
  teloneros
    .obtenerTeloneros()
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data).status(200);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/teloneros/:artistaId", (req, res) => {
  teloneros
    .obtenerConciertosTelonero(req.params.artistaId)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.get("/telonerosConcierto/:conciertoId", (req, res) => {
  teloneros
    .obtenerTelonerosConcierto(req.params.conciertoId)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404).json(crearError(data));
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
