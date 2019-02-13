const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')

module.exports = {
    genPass: function (input) {
        return bcrypt.hashSync(input, salt)
    },
    comparePass: function (input, pass) {
        return bcrypt.compareSync(input, pass)
    },
    verifyJwt: function (token) {
        return jwt.verify(token, process.env.JWT)
    }
}