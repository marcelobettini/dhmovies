//core modules
const path = require("node:path");
//external modules
const express = require("express");
const methodOverride = require("method-override");
//project modules
const movieRouter = require("./routes/movie.js");

const port = process.env.PORT ?? 3000;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => res.render("home"));
app.use("/movies", movieRouter);
app.get("/health", (req, res) => res.status(200));

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
