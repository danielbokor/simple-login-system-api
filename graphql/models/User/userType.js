const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user object',
    fields: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The first name of an user.',
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The last name of an user.',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of an user.',
        },
    }
});

module.exports = userType;
