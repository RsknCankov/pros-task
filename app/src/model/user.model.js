const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true
    },
    hashedPassword: String,
    salt: String
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema
    .path('username')
    .validate(function (username) {
        return username.length;
    }, 'Username cannot be blank');

UserSchema
    .path('hashedPassword')
    .validate(function (hashedPassword) {
        return hashedPassword.length;
    }, 'Password cannot be blank');

UserSchema
    .path('username')
    .validate(function (value) {
        let self = this;
        this.constructor.findOne({
            username: value
        }, function (err, user) {
            if (err) throw err;
            if (user) {
                if (self.id === user.id) return true;
                return false;
            }
            return true;
        });
    }, 'The specified username is already in use.');

let validatePresenceOf = function (value) {
    return value && value.length;
};

UserSchema
    .pre('save', function (next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword))
            next(new Error('Invalid password'));
        else
            next();
    });

UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     */
    authenticate: function (plainText) {
        return plainText === this.hashedPassword;
    },

    /**
     * Make salt
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     */
    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        let salt = new Buffer(this.salt, 'base64');
        return crypto.createHash('md5').update(password).digest('hex');
    }
};

module.exports = mongoose.model('User', UserSchema);
