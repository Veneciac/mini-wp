var express = require('express');
var router = express.Router();
var Controller = require('../controllers/article')
const { checkIdArticle, checkUser, authorizedUser } = require('../middlewares')
const image = require('../helpers/image')

router.get('/', Controller.readAll)

// BUAT UPLOAD IMAGENYA
router.post('/', checkUser, image.multer.single('image'), image.sendUploadToGCS, Controller.create)
// BUAT UPLOAD MUSICNY
router.put('/music/:id', checkUser, checkIdArticle, authorizedUser, image.multer.single('music'), image.sendUploadToGCS, Controller.uploadMusic)

router.get('/:id', checkUser, checkIdArticle, Controller.findOne)

router.put('/:id/like', checkUser, checkIdArticle, Controller.like)
router.put('/:id', checkUser, checkIdArticle, authorizedUser, image.multer.single('image'), image.sendUploadToGCS,  Controller.update)
router.delete('/:id', checkUser, checkIdArticle, authorizedUser, Controller.delete)

module.exports = router;
