const express = require('express')
const { getUser, deleteUser, updateUser } = require('../controllers/users.controllers')
const { checkUser, checkAuthentication, checkAuthoziration } = require('../middlewares/test.middlewares')
const router = express.Router()

router.get('/', checkUser, getUser)

router.delete('/', checkUser, deleteUser)

router.put('/', checkUser, updateUser)


module.exports = router