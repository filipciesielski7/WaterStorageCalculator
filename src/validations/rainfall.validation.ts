const Joi = require("joi");

const calculateVolume = {
  body: Joi.object().keys({
    surface: Joi.array().items(Joi.number().integer()).min(1).required(),
  }),
};

module.exports = {
  calculateVolume,
};
