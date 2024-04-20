const mongoose = require('mongoose')
const userSchema = require('./userSchema')

const userModel = mongoose.model('users', userSchema)



module.exports.getAllUserDb = () => {
    return userModel.find()
}
module.exports.getUserOneDb = (data) => {
    return userModel.findOne(data)
}
module.exports.postUserToDb = (data) => {
    return userModel.create(data)
}
module.exports.deleteUserDb = (id) => {
    return userModel.deleteOne(id)
}
module.exports.updateUserDb = ({ username, password }) => {
    return userModel.updateOne({ username }, { password })
}