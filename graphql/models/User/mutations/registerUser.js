const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');
const userType = require('../userType');
const BadRequestError = require('../../../../errors/BadRequestError');

const registerUser = {
    type: userType,
    args: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: async (parent, args, {
        mongo: { User },
    }) => {
        const result = await User.findOne({ email: args.email });
        if (result) {
            throw new BadRequestError({
                message: 'Email already registered',
            });
        }

        const { password: unencryptedPassword, ...remainingArgs } = args;

        const user = await new User(remainingArgs);

        user.password = await user.getEncryptedPassword(unencryptedPassword);

        await user.save();

        return user;
    }
};

module.exports = registerUser;
