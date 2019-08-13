const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const routes = require('./routes')


const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('Nova Conexao', socket.id)

    socket.on('Hello', message => {
        console.log(message)
    })
})

mongoose.connect('mongodb://localhost/omnistack', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB está conectado'))
    .catch(err => console.error(err));


app.use(cors())   
app.use(express.json())
app.use(routes)
server.listen(3333)