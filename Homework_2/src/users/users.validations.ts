import Joi from 'joi';

export const usersValidations = Joi.object({
    login: Joi.string()
        .alphanum()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    age: Joi.number()
        .required()
        .integer()
        .min(4)
        .max(130),
});
