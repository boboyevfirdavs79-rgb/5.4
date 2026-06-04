const CustomErrorHandler = require("../error/error");
const { validateWriter } = require("../validator/author.validator");

module.exports = function (req, res, next) {
  const { error } = validateWriter(req.body);

  if (error) {

    const errorMessage = error.details.map(d => d.message.replace(/"/g, '')).join(', ');

    return next(CustomErrorHandler.BadRequest(errorMessage));
  }

  next();
};