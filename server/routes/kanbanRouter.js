const express = require("express")
const router = express.Router()

const kanbanControl = require('../controller/kanbanControl')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/kanbans', authentication, kanbanControl.show)
router.get('/kanbans/:id', authentication,kanbanControl.find)
router.post('/kanbans', authentication, kanbanControl.create)
router.put('/kanbans/:id',authentication, authorization, kanbanControl.edit)
router.delete('/kanbans/:id', authentication, authorization, kanbanControl.delete)

module.exports = router