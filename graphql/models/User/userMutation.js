const createTokens = require('./mutations/createTokens');
const registerUser = require('./mutations/registerUser');
const refreshAuthToken = require('./mutations/refreshAuthToken');

module.exports = {
    createTokens,
    registerUser,
    refreshAuthToken,
};
