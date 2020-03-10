const express = require("express")
const router = express.Router()

const userControl = require('../controller/userControl')

router.post('/register', userControl.register)
router.post('/login',userControl.login)
router.post('/googlelogin', userControl.googleLogin)

module.exports = router