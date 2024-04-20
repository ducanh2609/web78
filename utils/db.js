const mongoose = require('mongoose')
const { DB_CONFIG } = require('../constants')
const DB_URI = `mongodb+srv://${DB_CONFIG.USER_NAME}:${DB_CONFIG.PASSWORD}@ducanhtest.s9kqzds.mongodb.net/${DB_CONFIG.DATABASE}`


async function connectToDb() {
    mongoose.connect(DB_URI)
        .then(() => console.log('Connected!'))
}

module.exports = { connectToDb };