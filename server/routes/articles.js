var express = require('express');
var router = express.Router();
var Controller = require('../controllers/article')
const { checkIdArticle, checkUser, authorizedUser } = require('../middlewares')
const image = require('../helpers/image')

router.get('/', Controller.readAll)
router.post('/', checkUser, image.multer.single('image'), image.sendUploadToGCS, Controller.create)

router.get('/:id', checkUser, checkIdArticle, Controller.findOne)
router.put('/:id', checkUser, checkIdArticle, authorizedUser, image.multer.single('image'), image.sendUploadToGCS,  Controller.update)
router.delete('/:id', checkUser, checkIdArticle, authorizedUser, Controller.delete)

module.exports = router;
