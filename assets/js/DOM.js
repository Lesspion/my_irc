(function () {
    
    var DOM = {};
    
    DOM.addMessage = function(DOMMessage) {
        document.querySelector('.scrollable').innerHTML = document.querySelector('.scrollable').innerHTML + DOMMessage; // TO-TEST
    };
    
    DOM.addChannel = function (DOMChannel) {
        document.querySelector('.fixed').appendChild(DOMChannel);
    };
    
    DOM.removeChannel = function (channelName) {
        var channelToRemove = document.querySelector('*[data-channelName=' + channelName + ']');
        channelToRemove.parentNode.remove(channelToRemove);
    };
    
    window.DOM = DOM;
}).call(this);