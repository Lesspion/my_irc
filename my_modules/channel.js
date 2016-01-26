var Channel = {
    checkIfAlreadyJoin: function (channelObject, nickname, channelName) {
        for (var i = 0; i < channelObject[nickname].length; i++) {
            if (channelObject[nickname][i] === channelName) {
                return true;
            }
        }
        return false;
    }
};

module.exports = Channel;