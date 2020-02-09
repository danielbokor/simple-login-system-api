const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('../graphql/schema');
const cors = require('cors');

const router = express.Router();

router.use('/', cors(), expressGraphql({
    graphiql: true,
    schema,
}));

module.exports = router;
