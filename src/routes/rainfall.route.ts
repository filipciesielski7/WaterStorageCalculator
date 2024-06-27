import express from "express";

const { rainfallController } = require("../controllers");
const validate = require("../middlewares/validate");
const rainfallValidation = require("../validations/rainfall.validation");

const router = express.Router();

router.post(
  "/volume",
  validate(rainfallValidation.calculateVolume),
  rainfallController.calculateVolume
);

module.exports = router;
