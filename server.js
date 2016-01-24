var http = require('http'),
    socket_io = require('socket.io'),
    ent = require('ent'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/views/index.html', function(error, content) {
		if (error) {
			res.writeHead(500);
			res.end();
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content, 'utf-8');
		}
	});
});

server.listen(1664);
var io = socket_io.listen(server);

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

console.log('magic happens on port : ' + 1664);