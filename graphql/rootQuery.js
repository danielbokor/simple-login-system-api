const {
    GraphQLObjectType,
} = require('graphql');
const userQuery = require('./models/User/userQuery');

const Query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root Query type.',
    fields: {
        ...userQuery,
    },
});

module.exports = Query;