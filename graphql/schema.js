const graphql = require('graphql')
const {
    GraphQLSchema,
} = graphql;
const rootQuery = require('./rootQuery');
const rootMutation = require('./rootMutation');

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})

module.exports = schema;