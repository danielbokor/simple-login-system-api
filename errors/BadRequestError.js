const { createError } = require('apollo-errors');

const BadRequestError = createError('BadRequestError', {
    message: 'Bad Request',
    data: {
        status: 400,
    },
});

module.exports = BadRequestError;
