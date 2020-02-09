const {
    GraphQLList,
} = require('graphql');
const userType = require('../userType');

const getUsers = {
    type: new GraphQLList(userType),
    resolve: async (parent, args, {
        mongo: { User },
    }) => {
        return User.find({}, function (err, docs) {});
    },
};

module.exports = getUsers;
