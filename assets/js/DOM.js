(function () {
    DOM = {};
    DOM.prototype.addMessage = function(DOMMessage) {
        document.querySelector('.scrollable').appendChild(DOMMessage); // TO-TEST
    };
}).call(this);