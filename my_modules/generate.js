var Generate = {
    anonymousUser: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return "anonymous#" + s4() + s4();
    }
}

module.exports = Generate;