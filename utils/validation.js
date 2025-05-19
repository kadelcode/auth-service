const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    })
})

module.exports = registerSchema;