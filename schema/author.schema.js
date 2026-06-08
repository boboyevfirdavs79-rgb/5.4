const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "Muallif ismini kiritish majburiy!"],
    trim: true
  },
  birth_year: {
    type: Number,
    required: [true, "Tug'ilgan yilini kiritish majburiy!"],
    min: [0, "Yil manfiy bo'lishi mumkin emas"]
  },
  death_year: {
    type: Number,
    required: false,
    validate: {
      validator: function (value) {

        return !value || value >= this.birth_year;
      },
      message: "O'lim yili tug'ilgan yildan oldin bo'lishi mumkin emas!"
    }
  },
  bio: {
    type: String,
    required: [true, "Biografiyani kiritish majburiy!"]
  },
  period: {
    type: String,
    required: [true, "Davriylikni kiritish majburiy!"],
    default: "Temuriylar davri",
    enum: {
      values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
      message: "{VALUE} bunday davr ko'rsatilmagan"
    }
  },
  work: {
    type: String,
    required: [true, "Asarlarini kiritish majburiy!"]
  },
  region: {
    type: String,
    required: [true, "Tug'ilgan hududini kiritish majburiy!"]
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model("Author", AuthorSchema);