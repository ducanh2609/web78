// const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const { userModel } = require('../models/users.models')
const { getAllUserDb, postUserToDb, deleteUserDb, updateUserDb } = require('../models/users/users.models')

module.exports.getUser = async (req, res) => {
    try {
        let getUser
        if (!req.body.username) {
            getUser = await getAllUserDb()
        } else {
            getUser = req.user
        }
        res.send(getUser)
    } catch (error) {
        console.log(error)
    }
}

module.exports.login = async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    const token = jwt.sign({ user: username, password: pass }, 'testtoken')
    res.json({ user: username, token: token })
}

module.exports.postUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        const role = ['user']
        const response = await postUserToDb({ username, password, role })
        if (response)
            res.json({ message: "Create successfully" })
    } catch (error) {
        console.log(error)
        res.send({
            usernameError: error.errors.username?.message,
            passwordError: error.errors.password?.message
        })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await deleteUserDb({ _id: req.params.id })
        res.send('Delete successfully!')
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body
        await updateUserDb({ username, password })
        res.send('Update successfully!')
    } catch (error) {
        console.log(error)
    }
}