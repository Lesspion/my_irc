var socket = io.connect('http://localhost:1664');

socket.on('my_name_is', function (name) {
    user.nickname(name);
});

document.addEventListener('DOMContentLoaded', function () {
    var send = document.querySelector('.my-send');
    var input = document.querySelector('#my-msg');
    
    send.addEventListener('click', function () {
        
    });
    
    input.addEventListener('keydown', function (e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            // enter ok;
        }
    });
});