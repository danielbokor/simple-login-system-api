const { createError } = require('apollo-errors');

const NotFoundError = createError('NotFoundError', {
    message: 'Not Found',
    data: {
        status: 404,
    },
});

module.exports = NotFoundError;
