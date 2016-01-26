var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs');

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index2.html');
});

io.sockets.on('connection', function (socket, pseudo) {

    socket.on('nouveau_client', function(pseudo) {

        pseudo = ent.encode(pseudo);

        socket.pseudo = pseudo;

        socket.broadcast.emit('nouveau_client', pseudo);

    });

    socket.on('message', function (message) {

        message = ent.encode(message);

        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});

    });
    
});

server.listen(1664);
console.log('magic happens on port : ' + 1664);