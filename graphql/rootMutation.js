const {
    GraphQLObjectType,
} = require('graphql');
const userMutation = require('./models/User/userMutation');

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root Mutation type.',
    fields: {
        ...userMutation,
    },
});

module.exports = Mutation;
