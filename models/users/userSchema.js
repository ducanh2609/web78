const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: [String],
})


userSchema.path('username').validate(function (value) {
    if (value.length <= 6) {
        this.invalidate('username', 'Username phải lớn 6 kí tự')
    }
    return true
})

userSchema.path('password').validate(function (value) {
    if (value.length < 8) {
        this.invalidate('password', 'Mật khẩu phải lớn hơn 8 kí tự')
    }
    return true
})

module.exports = userSchema