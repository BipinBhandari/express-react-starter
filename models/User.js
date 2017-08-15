const crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose');

const schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: String,
    email: {type: String, unique: true},
    role: {
        type: String,
        enum: ['ADMIN', 'STAFF'],
    },
    password: String,
}, schemaOptions);

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};

userSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
