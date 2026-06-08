const { Router } = require("express");
const { register, login, verify } = require("../controller/auth.controller");
const authValidateMiddleware = require("../middleware/auth.validate.middleware");

const authRouter = Router();

authRouter.post("/register", authValidateMiddleware("register"), register);
authRouter.post("/verify", authValidateMiddleware("verify"), verify)
authRouter.post("/login", authValidateMiddleware("login"), login);

module.exports = authRouter;