const Joi = require("joi");

exports.userRegVadilation = function userVadilation(user) {
  const Schema = Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),

    id: Joi.string(),
    WalletData: [
      {
        title: Joi.string(),
        amount: Joi.string(),
        date: Joi.string(),
      },
    ],
  });

  return Schema.validate(user);
};
