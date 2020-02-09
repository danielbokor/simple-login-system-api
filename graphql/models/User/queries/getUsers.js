const {
    GraphQLList,
    GraphQLObjectType,
} = require('graphql');
const userType = require('../userType');
const users = require('../mockData');

const getUsers = {
    type: new GraphQLList(userType),
    resolve: () => users,
};

module.exports = getUsers;