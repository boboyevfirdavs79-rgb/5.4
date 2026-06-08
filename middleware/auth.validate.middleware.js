const CustomErrorHandler = require("../error/error")
const authValidator = require("../validator/auth.validator")

module.exports = function (type) {

  return function (req, res, next) {

    const validatorAction = authValidator[type];

    if (!validatorAction) {
      return next(new Error(`Validator ichida '${type}' degan funksiya topilmadi.`));
    }

    const { error } = validatorAction(req.body);

    if (error) {
      throw CustomErrorHandler.BadRequest(error);
    }

    next();
  };
};