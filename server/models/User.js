const mongoose = require('mongoose')
var Schema = mongoose.Schema
const genPass = require('../helpers').genPass

function CheckUnique() {
    return new Promise((res, rej) =>{
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if(data) {
                    res(false)
                } else {
                    res(true)
                }
            })
            .catch(err => {
                res(false)
            })
    })
}

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    birthday: Date,
    aboutMe: String,
    image: String,
    password: {
        type: String,
        required: [true, `Password required`]
    },
    email: {
        type: String,
        required: [true, 'Email must be filled'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [CheckUnique, 'Email already taken']
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (!this.hasOwnProperty('useOldPassword')) {
        this.password = genPass(this.password)
    }
    next();
});


var User = mongoose.model('User', userSchema)

module.exports = User