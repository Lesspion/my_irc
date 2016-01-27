(function () {
    
    var DOMElement = {};
    
    DOMElement.newMessage = function (messageContent, nickname, me) {
        var s = !me ? 's6' : 'offset-s6';
        var isItMe = !me ? 'not-me' : 'me'
        var color = !me ? 'blue-grey' : 'grey';
        return '<div class="col ' + s + '" style="height: 200px;">' + 
                   '<div class="card ' + color + ' darken-1">' +
                       '<div class="card-content white-text">' +
                           '<span class="card-title ' + isItMe + '">' + nickname + '</span>' +
                                '<p>' + messageContent + '</p>' +
                       '</div>' +
                   '</div>' +
               '</div>';
    };
    
    DOMElement.newChannel = function (channelName) {
        return '<div class="card-panel hoverable center-align" data-channelName="' + channelName + '" onclick="user.switchChannel(' + channelName + ')">' + channelName + '</div>';
    };
    
    window.DOMElement = DOMElement;
    
}).call(this);