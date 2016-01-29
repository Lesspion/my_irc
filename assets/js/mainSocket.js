/* global Command */
/* global io */
/* global DOMHistory */
/* global user */
/* global DOMElement */
/* global DOM */


// DOM party !!!!!!!!
document.addEventListener('DOMContentLoaded', function () {
    
    var send = document.querySelector('.my-send');
    var input = document.querySelector('#my-msg');
    
    // socket party !!!!!
    var socket = io.connect('http://localhost:1664');
    window.socket = socket;
    user.init(socket);
    Command.init(socket, user);
    
    socket.on('my_name_is', function (name) {
        user.setNickname(name);
    });

    socket.on('listen_me', function (msgObject) {
        // condition if it's me or not
        var me = msgObject.nickname === user.nickname ? true : false;
        console.log('I have : ', msgObject);
        if (user.getViewRoom() === msgObject.room) {
            DOM.addMessage(DOMElement.newMessage(msgObject.message, msgObject.nickname, me));
        } else {
            // DOMHistory.allMessages[msgObject.room] += DOMElement.newMessage(msgObject.message, msgObject.user, me);
        }
    });
    
    socket.on('room_list', function (roomsList) {
        // afficher room (array)
        console.log('herre');
        alert(roomsList.join(' '));
    });
    
    send.addEventListener('click', function (e) {
        Command.search(document.querySelector('#my-msg').value);
        e.preventDefault();
    });
    
    input.addEventListener('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            // enter ok;
            Command.search(document.querySelector('#my-msg').value);
            e.preventDefault();
        }
    });
});