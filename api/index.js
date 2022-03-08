const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  app = express(),
  sql = require("mssql");

const config = {
  llave: "miclaveultrasecreta123*",
  user: "sa",
  password: "Pa88word",
  server: "185.60.40.210",
  port:58015,
  database: "TFG_JUM",
  trustServerCertificate: true,
};

app.set("llave", config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
app.get("/", function (req, res) {
  res.json({ message: "recurso de entrada" });
});

// 5
app.post("/autenticar", (req, res) => {
  console.log(req.body);
  console.log("PRE SQL");
  sql.connect(config, function (err) {
    console.log("POST SQL");
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      `select * from usuarios where usuario = ${req.body.usuario} && contrasena == ${req.body.contrasena}`,
      function (err, recordset) {
        //if (req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, app.get("llave"), {
          expiresIn: 1440,
        });
        res.json({
          mensaje: "Autenticación correcta",
          token: token,
        });
        //} else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" });

        if (err) console.log(err);
      }
    );
  });
});

// 6
const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("llave"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

// PRUEBA; get todos los usuarios
app.get("/usuarios", (req, res)=>{
  sql.connect(config, function (err) {
    console.log("POST SQL");
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      `select * from usuarios`,
      function (err, recordset) {
        const payload = {
          check: true,
        };
        res.json({
          mensaje: "Usuarios",
          usuarios: recordset,
        });

        if (err) console.log(err);
      }
    );
  });
});

app.get("/datos", rutasProtegidas, (req, res) => {
  const datos = [
    { id: 1, nombre: "Asfo" },
    { id: 2, nombre: "Denisse" },
    { id: 3, nombre: "Carlos" },
  ];

  res.json(datos);
});