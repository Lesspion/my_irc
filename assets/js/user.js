(function () {
    var user = {
        socket: null,
        nickname: null,
        viewRoom: "",
        allRoom: [],
        init: function (socket) {
            this.socket = socket;
        },
        setNickname: function (name) {
            this.nickname = name;
        },
        getNickname: function () {
            return this.nickname;
        },
        setViewRoom: function (roomName) {
            this.viewRoom = roomName;
        },
        getViewRoom: function () {
            return this.viewRoom;
        },
        emptyInput: function () {
            document.querySelector('#my-msg').value = "";
        },
        addRoom: function (roomName) {
            this.allRoom.push(roomName);
        },
        getAllRoom: function () {
            return this.allRoom;
        },
        removeRoom: function (roomName) {
            var index = this.allRoom.indexOf(roomName);
            if (index !== -1) {
                this.allRoom.remove(index);
            }
            if (roomName === this.getViewRoom()) {
                this.setViewRoom(null);
            }
        },
        send: function () {
            var obj = {};
            obj.nickname = this.nickname;
            obj.room = this.getViewRoom();
            obj.message = document.querySelector('#my-msg').value;
            this.socket.emit('message_is_coming', obj);
            this.emptyInput();
        },
        switchChannel: function (channelName) {
            
        }
    };
    
    window.user = user;
})(this);