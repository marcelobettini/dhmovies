const router = require("express").Router();
const authController = require("../controllers/auth.js");
router.get("/login", authController.getLoginForm);
router.get("/register", authController.getRegisterForm);
router.get("/logout", authController.logout)
router.post("/login", authController.login);
router.post("/register", authController.register);
module.exports = router;
