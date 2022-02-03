const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.post('/signup', userController.signUp)
router.delete('/deleteuser', auth.auth, userController.deleteUser);
router.post('/login', userController.login)
router.get('/pingauth', auth.pingAuth)

module.exports = router
