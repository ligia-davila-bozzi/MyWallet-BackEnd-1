import joi from 'joi';

const validateRegister = joi.object({
    description: joi.string().min(3).required(),
    value: joi.number().required()
});

export { validateRegister };