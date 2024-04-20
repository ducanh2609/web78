const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getUserOneDb } = require('../models/users/users.models')


module.exports.checkUser = async (req, res, next) => {
    try {
        const user = await getUserOneDb({ username: req.body.username })
        if (user) {
            req.user = user
            next()
        } else {
            res.send('User not found')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.checkExitsUserSignIn = async (req, res, next) => {
    const { username } = req.body
    // const user = await userModel.findOne({ username })
    const user = await getUserOneDb({ username })
    console.log(user)
    if (user) res.status(400).json({ message: 'User Exits' })
    else next()
}

module.exports.checkExitsUserLogin = (req, res, next) => {
    const { username, password } = req.body
    fs.readFile('./servers/users.json', (err, data) => {
        if (err) throw err
        const dataPar = JSON.parse(data)
        const user = dataPar.find(item => item.username == username && item.password == password)
        if (user) {
            next()
        }
        else res.status(400).json({ message: 'Tài khoản không đúng' })
    })
}


module.exports.checkAuthentication = async (req, res, next) => {
    try {
        const { password } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, 'testtoken')
        // console.log(decoded)
        const isPassMatch = await bcrypt.compare(password, decoded.password)
        // console.log(isPassMatch)
        if (isPassMatch) next()
        else res.json({ message: 'bạn chưa đăng nhập' })
    } catch (error) {
        console.log(error)
    }
}
module.exports.checkAuthoziration = (req, res, next) => {
    const { username } = req.body
    const allUser = JSON.parse(fs.readFileSync('./servers/users.json', { encoding: "utf8" }))
    const user = allUser.find(item => item.username == username)
    if (user?.role.includes("admin")) next()
    else res.json({ message: "Bạn không có quyền truy cập" })
}