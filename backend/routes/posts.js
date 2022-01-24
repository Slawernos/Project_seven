const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/getall', auth.auth, postsController.getAll);
router.get('/getone', auth.auth, postsController.getOne);
router.delete('/', auth.auth, postsController.deletePost)
router.post('/getchunk', auth.auth, postsController.getChunk);
router.put('/', auth.auth, multer, postsController.updatePost)
router.post('/', auth.auth, multer, postsController.addPost,);


module.exports = router
