const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const { full_name, birth_year, death_year, bio, period, work, region } = req.body;

    await AuthorSchema.create({
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
    });

    res.status(201).json({
      message: "Added new author",
    });
  } catch (error) {
    next(error);
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(foundedAuthor);
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, birth_year, death_year, bio, period, work, region } = req.body;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.updateOne({ _id: id }, {
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
    });

    res.status(200).json({
      message: "Updated author",
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "Deleted author",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};