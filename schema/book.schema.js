const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Kitob nomini kiritish majburiy!"],
    trim: true,
    maxlength: [100, "Kitob nomi 100 ta belgidan oshmasligi kerak"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Kitob muallifini ko'rsatish majburiy!"]
  },
  cover_image: {
    type: String,
    required: [true, "Muqova rasmi linkini kiriting!"]
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Reyting 0 dan past bo'lishi mumkin emas"],
    max: [5, "Reyting 5 dan baland bo'lishi mumkin emas"]
  },
  reviews_count: {
    type: Number,
    default: 0,
    min: [0, "Sharhlar soni manfiy bo'lishi mumkin emas"]
  },
  genre: {
    type: String,
    required: [true, "Janrni kiritish majburiy!"],
    default: "Badiy",
    enum: {
      values: ["Badiy", "Tarixiy", "Fantastik", "Nasr", "Drama", "Qissa", "Roman", "She'riat"],
      message: "{VALUE} bunday janr tizimda mavjud emas"
    }
  },
  description: {
    type: String,
    required: [true, "Kitob tavsifini kiritish majburiy!"],
    minlength: [10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak"]
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model("Book", BookSchema);