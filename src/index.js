//core modules
const path = require("node:path");
//external modules
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session")
//project modules
const movieRouter = require("./routes/movie.js");
const authRouter = require("./routes/auth.js");

const port = process.env.PORT ?? 3000;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.session_secret, // Clave para firmar la cookie de sesión
  resave: false,         // No guarda la sesión si no hay cambios
  saveUninitialized: false, // No guarda sesiones vacías
  cookie: {
    secure: false,        // envía la cookie a través de HTTP y HTTPS 
    httpOnly: true,      // Evita acceso desde JavaScript
    maxAge: 60000 * 60 * 24 * 7     // Duración de la cookie en milisegundos (1 semana)
  }
}));

// Middleware para agregar datos de sesión a res.locals
function sessionMiddleware(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

// Usar el middleware en tu aplicación
app.use(sessionMiddleware);

app.get("/", (req, res) => res.render("home", { user: req.session.user }));
app.get("/about", (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login")
  res.render("about")

})
app.use("/movies", movieRouter);
app.use("/auth", authRouter);
app.get("/health", (req, res) => res.status(200));
app.use((req, res) => {
  res.status(404).render("not-found");
});

app.listen(port, (err) =>
  console.log(
    err
      ? `Server failed to launch: ${err.message}`
      : `
------------------------------------------
Server running on http://127.0.0.1:${port}

CTRL + C to cancel...
------------------------------------------
`
  )
);
