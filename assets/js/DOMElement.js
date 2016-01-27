(function () {
    
    var DOMElement = {};
    
    DOMElement.prototype.newMessage = function (messageContent, nickname, me) {
        var s = !me ? 's6' : 'offset-s6';
        var isItMe = !me ? 'not-me' : 'me'
        return '<div class="col ' + s + '" style="height: 200px;">' + 
                   '<div class="card blue-grey darken-1">' +
                       '<div class="card-content white-text">' +
                           '<span class="card-title ' + isItMe + '">' + nickname + '</span>' +
                                '<p>' + messageContent + '</p>' +
                       '</div>' +
                   '</div>' +
               '</div>';
    };
    
    DOMElement.prototype.newChannel = function (channelName) {
        return '<div class="card-panel hoverable center-align" data-channelName="' + channelName + '" onclick="user.switchChannel(' + channelName + ')">' + channelName + '</div>';
    };
    
}).call(this);