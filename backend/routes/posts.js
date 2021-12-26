const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const auth = require('../middleware/auth')

router.get('/getall', auth.auth, postsController.getAll);
router.post('/getchunk', auth.auth, postsController.getChunk);
router.post('/', auth.auth, postsController.addPost);


module.exports = router
