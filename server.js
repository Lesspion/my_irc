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
    res.sendFile(__dirname + '/views/index3.html');
});

var channels = {};
var users = {}; //stock socket.id en value
var channelsList = [];

io.sockets.on('connection', function (socket) {

    socket.nickname = Generate.anonymousUser();
    users[socket.nickname] = socket.id;
    channels[socket.nickname] = [];
    console.log('his nickname is : ' + socket.nickname);
    socket.emit('my_name_is', socket.nickname);
    
    socket.on('join_the_dark_side', function (channelName) { //join a room
        channels[socket.nickname].push(channelName);
        socket.join(channelName);
        socket.curRoom = channelName;
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
            nickname: "HisNickname",
            room: "roomName"
        }
    */
    socket.on('message_is_coming', function (objectMsg) { // new message
         io.sockets.in(objectMsg.room).emit('listen_me', objectMsg);
    });
    
    socket.on('say_my_name', function (newNickname) { // change nickname
        delete users[socket.nickname];
        socket.nickname = newNickname;
        users[socket.nickname] = socket.id
        console.log(socket.nickname);
    });
    
    socket.on('it_s_over_9000', function () {
        socket.emit('room_list', channels[socket.nickname]);
    });
    
    socket.on('how_many', function () {
        var cur = socket.curRoom;
        var u = [];
        for (var user in channels) {
            for (var i = 0; i < channels[user].length; i++) {
                if (channels[user][i] === cur) {
                    u.push(user);
                }
            }
        }
        socket.emit('we_are', u);
    });
    
    socket.on('this_is_private', function (name, content, from) {
        if (users[name]) {
            io.to(users[name]).emit('private_message', content, from);
            console.log(from, content, name);
        }
    })
    
});

server.listen(1664);
console.log('magic happens on port : ' + 1664);