const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const BadRequestError = require('../../../../errors/BadRequestError');
const NotFoundError = require('../../../../errors/NotFoundError.js');

const refreshAuthToken = {
    type: new GraphQLObjectType({
        name: 'RefreshTokenPayload',
        fields: {
            authToken: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'The refreshToken of an user.',
            },
        },
    }),
    args: {
        refreshToken: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The refreshToken of an user.',
        },
    },
    resolve: async (
        parent,
        args,
        { mongo: { User } },
    ) => {
        const refreshToken = await User.verifyRefreshToken(args.refreshToken);

        if (!refreshToken) {
            throw new BadRequestError({
                message: 'Invalid token',
            });
        }

        const { user: { id } } = refreshToken;
        const user = await User.findById(id);

        if (!user) {
            throw new NotFoundError({
                message: 'User not found',
            });
        }

        const authToken = user.createAuthToken();

        return {
            authToken,
        };
    },
}

module.exports = refreshAuthToken;
