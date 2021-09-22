const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log('Server listening on port: ', PORT)
});

let mensajes = [
    {autor: 'Pablo', texto: 'Me gusta el live coding'},
    {autor: 'Diego', texto: 'Me gusta cobol'},
    {autor: 'Lucas', texto: 'Me gusta Node JS y React Native'}
]

app.use(express.static('./public'));

io.on('connection', (socket) => {
    console.log('usuario conectado');
    socket.emit('mensajes', mensajes);
    socket.on('nuevo', (data) => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });
});