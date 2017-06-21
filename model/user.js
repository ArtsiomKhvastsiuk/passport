const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
        username: {
            type: String,
            index: true,
            required: true,
            unique: true,
            match: /^[\w@$!%*#?&]{6,12}$/
        },
        password: {
            type: String,
            required: true
        }
    },
        {
            timestamp: true
        });


UserSchema.methods.validPassword = function(password) {
    if (this.password !== password) {
        return false;
    }

    return true;
}

module.exports = mongoose.model('User', UserSchema);