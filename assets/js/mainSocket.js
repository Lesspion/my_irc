/* global Command */
/* global io */
/* global DOMHistory */
/* global user */
/* global DOMElement */
/* global DOM */


document.addEventListener('DOMContentLoaded', function () {
    
    var send = document.querySelector('.my-send');
    var input = document.querySelector('#my-msg');
    
    var socket = io.connect('http://localhost:1664');
    window.socket = socket;
    user.init(socket);
    Command.init(socket, user);
    
    socket.on('my_name_is', function (name) {
        user.setNickname(name);
    });

    socket.on('listen_me', function (msgObject) {
        var me = msgObject.nickname === user.nickname ? true : false;
        if (user.getViewRoom() === msgObject.room) {
            DOM.addMessage(DOMElement.newMessage(msgObject.message, msgObject.nickname, me));
        } else {
            if (typeof DOMHistory.allMessages[msgObject.room] === 'undefined') {
                DOMHistory.allMessages[msgObject.room] = [];
            } else if (typeof DOMHistory.allMessages[msgObject.room].push === "undefined") {
                DOMHistory.allMessages[msgObject.room] = [].slice.call(DOMHistory.allMessages[msgObject.room]);
            }
            var msg = DOMElement.newMessage(msgObject.message, msgObject.nickname, me, msgObject.room);
            if (typeof msg === "string") {
                msg = $(msg).get(0);
            }
            DOMHistory.allMessages[msgObject.room].push(msg);
        }
    });
    
    socket.on('room_list', function (roomsList) {
        alert(roomsList.join(' '));
    });
    
    socket.on('we_are', function (listUsers) {
        alert(listUsers.join(' '));
    });
    
    send.addEventListener('click', function (e) {
        Command.search(document.querySelector('#my-msg').value);
        e.preventDefault();
    });
    
    input.addEventListener('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            Command.search(document.querySelector('#my-msg').value);
            e.preventDefault();
        }
    });
});