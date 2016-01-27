(function () {
    
    var DOMHistory = {
        allMessages: {},
        getMessages: function (roomName) {
           return this.allMessages[roomName];
        },
        setMessages: function (roomName, message) {
            this.allMessages[roomName] = message;
        },
        removeRoomMessages: function (roomName) {
            delete this.allMessages[roomName];
        },
        clear: function () {
            this.allMessages = {};
        }
    };
    
}).call(this);