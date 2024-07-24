const { body, validationResult } = require("express-validator");
const { genres } = require("../constants");
const currYear = new Date().getFullYear();

const movieValidationRules = [
  body("title").notEmpty().withMessage("Must include a title"),
  body("year")
    .isInt({ min: 1896, max: currYear })
    .withMessage("A year between 1896 and the current year, both included"),

  body("director").notEmpty(),
  body("duration")
    .isInt({ min: 40 })
    .withMessage("Length in minutes, minimum value is 40"),

  body("genre").notEmpty(),
  body("rate")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Min value is 0 and max value is 10. You can use decimals."),
  body("synopsis").notEmpty(),
  //Esta regla nos sirvió mientras quisimos que el poster fuese obligatorio
  // body("poster").custom((_value, { req }) => {
  //   if (!req.file) {
  //     throw new Error("Poster is required");
  //   }
  //   return true; // Indica que la validación pasó
  // }),
];

const movieValidator = [
  ...movieValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res
      .status(400)
      .render("movieAdd", { errors: errors.array(), genres });
  },
];

module.exports = movieValidator;