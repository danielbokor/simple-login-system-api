const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');
const NotFoundError = require('../../../../errors/NotFoundError.js');

const createTokens = {
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
    resolve: async (
        parent,
        args,
        { mongo: { User } },
    ) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
            throw new NotFoundError({
                message: 'User not found',
            });
        }

        if (!await user.checkPassword(args.password)) {
            throw new NotFoundError({
                message: 'User not found',
            });
        }

        const authToken = user.createAuthToken();
        const refreshToken = user.createRefreshToken();

        const { firstName, lastName, email } = user;

        return {
            authToken,
            refreshToken,
            firstName,
            lastName,
            email,
        };
    },
};

module.exports = createTokens;