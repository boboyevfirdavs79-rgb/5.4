const { Router } = require("express");
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller");
const authorValidateMiddleware = require("../middleware/author.validate.middleware");

const authorRouter = Router();

authorRouter.get("/get_all_authors", getAllAuthors);
authorRouter.get("/get_one_author/:id", getOneAuthor);
authorRouter.post("/add_author", authorValidateMiddleware, addAuthor);

authorRouter.put("/update_author/:id", authorValidateMiddleware, updateAuthor);
authorRouter.delete("/delete_author/:id", deleteAuthor);

module.exports = authorRouter;