const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');
const userType = require('../userType');

const createAuthToken = {
    type: new GraphQLObjectType({
        name: 'SigninPayload',
        fields: {
            authToken: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The auth token of an user.',
            },
            refreshToken: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The refresh token of an user.',
            },
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
                description: 'The last name of an user.',
            },
        },
    }),
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's email.",
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: "A user's password.",
        },
    },
    resolve: (
        parent,
        { email, password }
    ) => {
        console.log(`email ${email} password ${password}`);
        return {
            authToken: 'my auth token',
            refreshToken: 'my refresh token',
            firstName: 'my first name',
            lastName: 'my last name',
            email: 'my email address',
        };
    },
};

module.exports = createAuthToken;