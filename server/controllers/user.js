const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { comparePass } = require('../helpers')

class UserController {

    static gooSign (req, res) {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            User.findOne({email: payload.email})
                .then(found => {
                    if (found) {
                        res.status(200).json({
                            msg: `Success sign in`,
                            token: jwt.sign({ id: found._id }, process.env.JWT),
                            data: found
                        })
                    } else {
                        return User.create({
                            name: payload.name,
                            email: payload.email,
                            image: payload.picture,
                            password: process.env.PASS_GOOGLE
                        })
                    }
                })
                .then(data => {
                    if (data) {
                        res.status(201).json({
                            msg: `Success register and sign in`,
                            token: jwt.sign({ id: data._id}, process.env.JWT),
                            data
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
        verify().catch(console.error)
    }

    static create(req, res) {
        let name = req.body.name
        let birthday = req.body.birthday
        let aboutMe = req.body.aboutMe
        let image = null
        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let email = req.body.email
        let password = req.body.password


        if ( !name || !email || !password) {
            res.status(400).json({
                msg: `Please fill name, email and password`
            })
        } else {
            let user = {
                name, birthday, aboutMe, image, email, password
            }

            for(let i in user) {
                if (!user[i]) delete user[i]
            }

            User.create(user)
            .then(data => {
                res.status(201).json({
                    data,
                    token: jwt.sign({ id: data._id }, process.env.JWT)
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
        }
    }

    static login(req, res) {
        User.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    console.log(data, req.body.password)
                    if (comparePass(req.body.password, data.password)) {
                        res.status(200).json({
                            token: jwt.sign({ id: data._id }, process.env.JWT),
                            data
                        })
                    } else {
                        res.status(400).json({
                            msg: `Wrong password / email`
                        })
                    }
                } else {
                    res.status(404).json({
                        msg: 'Please register first'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findAll(req, res) {
        User.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static getProfile(req, res) {
       res.status(200).json(req.currentUser)
    }

    static update(req, res) {
        let name = req.body.name
        let birthday = req.body.birthday
        let aboutMe = req.body.aboutMe
        let image = undefined
        let email = req.body.email
        let password = req.body.password

        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let upUser = {
            name, birthday, aboutMe, image, email, password
        }
        
        for (let i in upUser) {
            if ( !upUser[i] || upUser[i] == 'undefined') delete upUser[i]
        }

        if (!upUser.hasOwnProperty('password')) {
            req.currentUser.useOldPassword = true;
        }

        req.currentUser.set(upUser)
        req.currentUser.save()
            .then(data => {
                console.log(data, 'data yg dah di save')
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static delete(req, res) {
        req.currentUser.remove()
            .then(del => {
                res.status(200).json(del)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}
module.exports = UserController