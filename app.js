const express = require('express')
const bodyparser = require("body-parser");
const { connectToDb } = require('./utils/db')

const app = express()
const { login, postUser } = require('./controllers/users.controllers')
const { checkExitsUserSignIn, checkExitsUserLogin } = require('./middlewares/test.middlewares')


app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const userRouter = require('./routes/users.routes');
app.use('/user', userRouter)



app.get('/', (req, res) => {
    res.send('Homepage')
})

app.post('/login', login)

app.post('/signin', checkExitsUserSignIn, postUser)



app.listen(3000, () => {
    connectToDb()
})