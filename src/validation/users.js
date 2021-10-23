import joi from 'joi';

const validateUsers = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$'))
        .required()
        ,
    repeat_password: joi.ref('password')
});

export {
    validateUsers,
}