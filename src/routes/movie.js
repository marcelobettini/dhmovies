const router = require("express").Router();
const movieController = require("../controllers/movie.js");

router.get("/", movieController.getAll);
router.get("/s", movieController.getByTitle);
router.get("/:id", movieController.getById);
router.get("/edit/:id", movieController.getUpdateForm);
router.post("/", movieController.createOne);
router.put("/:id", movieController.updateOne);
router.delete("/:id", movieController.deleteOne);

module.exports = router;
