const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')

app.use(express.static(path.join(`${__dirname}/public`)))

io.on('connection', socket => {
    console.log('+1 connection')
    socket.on('disconnect', () => console.log('-1 connection'));
    socket.on('message', message => {
        console.log(message);
        io.emit('message', message);
    });
})
const PORT = 8080
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
