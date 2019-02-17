const Article = require('../models/Article')

class ArticleController {

    static create (req, res) {
        if (!req.file || !req.title || !req.briefDesc || !req.content ) {
            res.status(400).json({
                msg: `Image, title, description and content required`
            })
        } 

        let title = req.body.title
        let category = req.body.category
        let briefDesc = req.body.briefDesc
        let content = req.body.content
        let author = req.currentUser._id
        let image = req.file.cloudStoragePublicUrl
        let tag = req.body.tag.split(',')
     
        let newAr = {
            title, category, briefDesc, content, author, image, tag
        }

        for (let i in newAr) {
            if (!newAr[i]) {
                delete newAr[i]
            }
        }

        Article.create(newAr)
            .then(data => {
                return data.populate('author').execPopulate()
            })
            .then(populated => {
                res.status(201).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static readAll (req, res) {
        Article.find({}).populate('author').exec()
            .then( list => {
                res.status(200).json(list.reverse())
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findOne (req, res) {
       res.status(200).json(req.currentArticle)
    }

    static uploadMusic (req, res) {
        let music = req.file.cloudStoragePublicUrl

        req.currentArticle.set({ music })
        req.currentArticle.save()
            .then(data => {
                return data.populate('author').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static update (req, res) {
        let title = req.body.title
        let category = req.body.category
        let briefDesc = req.body.briefDesc
        let content = req.body.content
        let image = null

        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }

        let tag = req.body.tag.split(',')

        let newAr = {
            title, category, briefDesc, content, image, tag
        }

        for (let i in newAr) {
            if (!newAr[i]) {
                delete newAr[i]
            }
        }

        req.currentArticle.set(newAr)
        req.currentArticle.save()
            .then(data => {
                return data.populate('author').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static delete (req, res) {
        req.currentArticle.remove()
            .then(del => {
                res.status(200).json(del)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static like (req, res) {
        let userId = String(req.currentUser._id)
        let index = req.currentArticle.like.indexOf(userId)

        if (index == -1) {
            req.currentArticle.like.push(userId)
        } else {
            req.currentArticle.like.splice(index, 1)
        }

        req.currentArticle.save()
            .then(data => {
                return data.populate('author').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}
module.exports = ArticleController