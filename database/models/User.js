const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authTokenSecret, refreshTokenSecret } = require('../../config');

const SALT_ROUNDS = 12;

const TOKEN_EXPIRY = {
    ONE_HOUR: '1h',
    ONE_WEEK: '7d',
};

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: email => /[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,63}$/.test(email),
            message: 'Please fill a valid email address',
        },
        lowercase: true,
    },
    password: {
        type: String,
        default: '',
    },
},
{
    timestamps: true,
    usePushEach: true,
});

const prepareQuery = function (next) {
    const query = this.getQuery();
    if (query.email) {
        query.email = query.email.toLowerCase();
    }
    next();
};

UserSchema.pre('find', prepareQuery);
UserSchema.pre('findOne', prepareQuery);
UserSchema.pre('findOneAndRemove', prepareQuery);
UserSchema.pre('findOneAndUpdate', prepareQuery);

UserSchema.methods.getEncryptedPassword = async function getEncryptedPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
};

UserSchema.methods.checkPassword = async function checkPassword(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.createAuthToken = async function createToken() {
    const expiresIn = TOKEN_EXPIRY.ONE_HOUR;

    return jwt.sign({
        user: {
            id: this.id,
        },
    }, authTokenSecret, { expiresIn });
};

UserSchema.methods.createRefreshToken = async function createToken() {
    const expiresIn = TOKEN_EXPIRY.ONE_WEEK;
    
    return jwt.sign({
        user: {
            id: this.id,
        },
    }, refreshTokenSecret, { expiresIn });
};

UserSchema.statics.verifyAuthToken = async function verifyAuthToken(token) {
    try {
        return jwt.verify(token, authTokenSecret);
    } catch (e) {
        return false;
    }
};

UserSchema.statics.verifyRefreshToken = async function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (e) {
        return false;
    }
};

module.exports = mongoose.model('User', UserSchema);
