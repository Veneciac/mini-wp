var express = require('express');
var router = express.Router();
const Controller = require('../controllers/user')
const image = require('../helpers/image')
const { checkUser } = require('../middlewares')

router.get('/', Controller.findAll)
router.post('/', image.multer.single('image'), image.sendUploadToGCS, Controller.create)
router.post('/gooSign', Controller.gooSign)
router.post('/login', Controller.login)
router.put('/', checkUser, image.multer.single('image'), image.sendUploadToGCS, Controller.update)
router.delete('/', checkUser, Controller.delete)
router.get('/me', checkUser, Controller.getProfile)
module.exports = router;
