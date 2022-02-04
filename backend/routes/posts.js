const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/', auth.auth, postsController.getAll);
router.get('/getchunk', auth.auth, postsController.getChunk);
router.get('/getone', auth.auth, postsController.getOne);
router.get('/weekly', auth.auth, postsController.weekly);
router.delete('/', auth.auth, postsController.deletePost);
router.put('/', auth.auth, multer, postsController.updatePost)
router.post('/', auth.auth, multer, postsController.addPost,);


module.exports = router
