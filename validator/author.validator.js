const joi = require("joi");

const period = {
  TEMURID: 'Temuriylar davri',
  JADID: 'Jadid davri',
  UNION: 'Sovet davri',
  INDEPENDENCE: 'Mustaqillik davri'
};

const validateWriter = (data) => {
  const schema = joi.object({
    full_name: joi.string().required(),
    birth_year: joi.number().integer().required(),
    death_year: joi.number().integer().allow(null, '').optional(),
    bio: joi.string().required(),
    period: joi.string().valid(...Object.values(period)).required(),
    work: joi.string().required(),
    region: joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { validateWriter };