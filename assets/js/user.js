(function (global) {
    var user = {
        socket: null,
        nickname: null,
        init: function (socket) {
            this.socket = socket;
        },
        send: function (messageObject) {
            this.socket.emit('message_is_coming', messageObject);
        },
        emptyInput: function () {
            document.querySelector('my-msg').value = "";
        }
    };
})(this);