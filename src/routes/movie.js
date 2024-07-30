const router = require("express").Router();
const movieController = require("../controllers/movie.js");
const fileUpload = require("../services/fileUpload.js");
const movieValidator = require("../validators/movieValidator.js");
router.get("/", movieController.getAll);
router.get("/s", movieController.getByTitle);
router.get("/add", movieController.getAddForm);
router.get("/:id", movieController.getById);
router.get("/edit/:id", movieController.getUpdateForm);
router.post(
  "/",
  fileUpload.single("poster"),
  movieValidator,
  movieController.createOne
);
router.put("/:id", movieController.updateOne);
router.delete("/:id", movieController.deleteOne);

module.exports = router;
