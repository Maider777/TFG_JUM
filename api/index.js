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
  conciertos = require("./src/objetos/conciertos"),
  generos = require("./src/objetos/generos"),
  preferencias = require("./src/objetos/preferencias"),
  salas = require("./src/objetos/salas"),
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
  console.log("NO EXISTE, CREADO");
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
        res.status(401);
        return res.json({ mensaje: "Token inválida" });
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
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    request.query(
      `SELECT * FROM usuarios where usuario = '${req.body.usuario}' AND contrasena = '${req.body.contrasena}'`,
      function (err, response) {
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
          res.json({ mensaje: "Usuario o contraseña incorrectos" });
        }
      }
    );
  });
});

// ARTISTAS
app.get("/artistas/", rutasProtegidas, (req, res) => {
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

app.get("/artistas/:id", rutasProtegidas, (req, res) => {
  artistas
    .obtenerArtista(req.params.id)
    .then((data) => {
      if (!data || data[0].length == 0) {
        res.status(404);
      }
      res.json(data[0]);
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });
});

app.post("/artistas", rutasProtegidas, (req, res) => {
  artistas.crearArtista(req.body).then((data) => {
    res.json(data);
    /*if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);*/
  });
});

// CONCIERTOS
app.get("/conciertos/", rutasProtegidas, (req, res) => {
  conciertos.obtenerConciertos.then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);
  });
});

app.get("/conciertos/:id", rutasProtegidas, (req, res) => {
  conciertos.obtenerConcierto(req.params.id).then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);
  });
});

app.get("/conciertosArtista/:id", rutasProtegidas, (req, res) => {
  conciertos.obtenerConciertosArtista(req.params.id).then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);
  });
});

// GÉNEROS
app.get("/generos/", rutasProtegidas, (req, res) => {
  generos.obtenerGeneros().then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);
  });
});

app.get("/generos/:id", rutasProtegidas, (req, res) => {
  generos.obtenerGenero(req.params.id).then((data) => {
    if (!data || data[0].length == 0) {
      res.status(404);
    }
    res.json(data[0]);
  });
});

// PREFERENCIAS
app.get("/preferencias/:id", rutasProtegidas, (req, res) => {
  preferencias
    .obtenerPreferencias(req.params.usuario)
    .then((data) => {
      if (data instanceof Error) {
        res.status(404).json(crearError(data));
      }
      res.json(data[0]);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/preferencias", rutasProtegidas, (req, res) => {
  preferencias
    .crearPreferencia(req.body.usuario, req.body.artistaId)
    .then((data) => {
      if (data instanceof Error) {
        res.status(401).json(crearError(error));
      }
      res.json(data).status(201);
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

app.delete("/preferencias", rutasProtegidas, (req, res) => {
  preferencias
    .eliminarPreferencia(req.body.usuario, req.body.generoId)
    .then((data) => {
      if (data.rowsAffected == 0) {
        res.status(401).json(crearError(new Error("La preferencia no existe")));
      } else res.json(data, 204);
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
        res.status(401).json(crearError(new Error("El usuario no tiene preferencias")));
      } else {
        let respuesta = crearRespuesta("Preferencias eliminadas correctamente", data);
        console.log(respuesta);
        res.status(204).json(respuesta);
      }
    })
    .catch((error) => {
      res.status(401).json(crearError(error));
    });
});

// SALAS
app.get("/salas/:id", rutasProtegidas, (req, res) => {
  salas
    .obtenerSala(req.params.id)
    .then((data) => {
      if (data instanceof Error) {
        res.status(404).json(crearError(data));
      }
      res.json(data[0]);
    })
    .catch((error) => {
      res.json(error);
    });
});
