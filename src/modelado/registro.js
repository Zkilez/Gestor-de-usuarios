const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Vamos a encriptar el password
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(15)
        .then(salts => {
            return bcrypt.hash(this.password, salts);
        })
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(error => next(error));  // Manejamos el error aquí
});

module.exports = mongoose.model('siete', UserSchema);
