const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
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

mongoose.connect('mongodb+srv://dbUser:dbPass@clusterbruno-hbzd9.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB está conectado'))
    .catch(err => console.error(err));


app.use(cors())   
app.use(express.json())
app.use(routes)


app.use("/", express.static(__dirname + "/../../frontend/dist"));
const port = process.env.PORT || 9999;

server.listen(port, function () {
  console.log(`Servidor executando em ${port}`)
});
