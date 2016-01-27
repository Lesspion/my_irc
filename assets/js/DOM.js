(function () {
    
    var DOM = {};
    
    DOM.prototype.addMessage = function(DOMMessage) {
        document.querySelector('.scrollable').appendChild(DOMMessage); // TO-TEST
    };
    
    DOM.prototype.addChannel = function (DOMChannel) {
        document.querySelector('.fixed').appendChild(DOMChannel);
    };
    
    DOM.prototype.removeChannel = function (channelName) {
        var channelToRemove = document.querySelector('*[data-channelName=' + channelName + ']');
        channelToRemove.parentChild.remove(channelToRemove);
    };
    
}).call(this);