const mongoose = require('mongoose')
const User = require('../models/User')
const { verifyJwt } = require('../helpers')
const Article = require('../models/Article')

module.exports = {
    checkIdArticle: function (req, res, next) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Article.findById(req.params.id).populate('author').exec()
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Article not found`
                        })
                    } else {
                       req.currentArticle = found
                       next()
                    }
                })
        } else {
            res.status(500).json({
                msg: `Id is not valid`
            })
        }
    },
    authorizedUser: (req, res, next) => {
        if (String(req.currentUser._id) !== String(req.currentArticle.author._id)) {
            res.status(403).json({
                msg: `You are not authorized`
            })
        } else {
            next()
        }
    },
    checkUser: function (req, res, next) {
        if (!req.headers.token) {
            res.status(400).json({
                msg: `Please log in first`
            })
        } else {
            try {
                var decoded = verifyJwt(req.headers.token)
                
                if (mongoose.Types.ObjectId.isValid(decoded.id)) {
                    User.findById(decoded.id)
                        .then(data => {
                            if (!data) {
                                res.status(404).json({
                                    msg: `User not found`
                                })
                            } else {
                               req.currentUser = data
                               next() 
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: 'Internal server error'
                            })
                        })

                } else {
                    res.status(400).json({
                        msg: `User id is not valid`
                    })
                }

              } catch(err) {
                res.status(400).json({
                    msg: `Token is not valid!`
                })
              }
               
        }
    }
}