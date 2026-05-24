const { Schema, model } = require("mongoose");

const Book = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  cover_image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews_count: {
    type: Number,
    default: 0
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: ["Badiy", "Tarixiy", "Fantastik", "Nasr", "Drama", "Qissa", "Roman", "She'riat"],
      default: "Badiy",
      message: "{VALUE} bunday qiymat ko'rsatilmagan"
    }
  },
  description: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

const BookSchema = model("Book", Book);
module.exports = BookSchema;