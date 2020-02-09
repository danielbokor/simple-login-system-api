const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../config');

const { mongo: { uri } } = config;

mongoose.Promise = global.Promise;

module.exports = async () => {
    await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const { connection } = mongoose;

    connection.on('connected', () => winston.log('info', `Mongoose default connection is open to: ${uri}!`));

    connection.on('disconnected', () => winston.log('info', 'Mongoose default connection is disconnected!'));

    connection.on('error', error => winston.log('error', `Mongoose default connection has occured an error: ${error}`));

    /**
     * this event is fired when the process is closed
     * when the process is closed, it is a good habit to close all the opened connection of database.
     */
    process.on('SIGINT', () => {
        connection.close(() => {
            winston.log('info', 'Mongoose connection is closed due to application termination!');
            process.exit(0);
        });
    });
}