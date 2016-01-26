// PROTOTYPE ZONE
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
// END PROTOTYPE ZONE

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    fs = require('fs'),
    Generate = require('./my_modules/generate'),
    Channel = require('./my_modules/channel');

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index3.html');
});

var channels = {};
var users = {};
var channelsList = [];

io.sockets.on('connection', function (socket) {

    socket.nickname = Generate.anonymousUser();
    users[socket.nickname] = socket.nickname;
    channels[socket.nickname] = [];
    console.log('his nickname is : ' + socket.nickname);
    
    socket.on('join_the_dark_side', function (channelName) { //join a room
        if (!Channel.checkIfAlreadyJoin(channels, socket.nickname, channelName)) {
            channels[socket.nickname].push(channelName);
            socket.join(channelName);
        } else {
            // change current channel
        }
    });
    
    socket.on('justin_leave_r', function (channelName) { // leave a room
        socket.leave(channelName);
        var index = channels[socket.nickname].indexOf(channelName);
        if (index !== -1) {
            channels[socket.nickname].remove(index);
        }
    });
    
    /*
        {
            message: "My message",
            user: "HisNickname",
            room: "roomName"
        }
    */
    socket.on('message_is_coming', function (objectMsg) { // new message
         io.sockets.in(objectMsg.room).emit('listen_me', objectMsg);
    });
    
    socket.on('say_my_name', function (newNickname) { // change nickname
        socket.nickname = newNickname;
    });
});

server.listen(1664);
console.log('magic happens on port : ' + 1664);