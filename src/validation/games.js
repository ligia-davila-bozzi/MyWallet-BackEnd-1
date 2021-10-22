import joi from 'joi';

const validateGames = joi.object({
    name: joi.string().min(3).required(),
    image: joi.string().pattern(new RegExp('https?:\/\/.*\.(?:png|jpg)')),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().min(1).required(),
    pricePerDay: joi.number().required(),
}).length(5)

export {
    validateGames,
}