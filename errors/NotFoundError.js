const { createError } = request('apollo-errors');

const NotFoundError = createError('NotFoundError', {
    message: 'Not Found',
    data: {
        status: 404,
    },
});

export default NotFoundError;
