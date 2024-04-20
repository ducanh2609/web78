const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    teacherName: String,
    subject: String,
})

const teacherModel = mongoose.model('teacher', teacherSchema)



module.exports.getAllTeacherDb = () => {
    return teacherModel.find({}).toArray()
}

