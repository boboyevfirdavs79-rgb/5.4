const { Router } = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")
const authorization = require("../middleware/authorization")
const { adminChecker } = require('../middleware/admin.checker');
const authorRouter = Router()

authorRouter.get("/get_all_authors", authorization, getAllAuthors)
authorRouter.get("/get_one_author/:id", authorization, getOneAuthor)
authorRouter.get("/search", authorization, search)
authorRouter.post("/add_author", adminCheker, authorValidateMiddleware, addAuthor)
authorRouter.put("/update_author/:id", adminCheker, updateAuthor)
authorRouter.delete("/delete_author/:id", adminCheker, deleteAuthor)

module.exports = authorRouter