const express = require('express');
const expressGraphql = require('express-graphql');
const cors = require('cors');
const schema = require('../graphql/schema');
const mongoModels = require('../database/models');

const router = express.Router();

router.use('/', cors(), expressGraphql({
    context: {
        mongo: mongoModels
    },
    graphiql: true,
    schema,
}));

module.exports = router;