const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const auth = require('../middleware/auth')

router.get('/getall', auth, postsController.getAll);
router.post('/getchunk', auth, postsController.getChunk);
router.post('/', auth, postsController.addPost);


module.exports = router
