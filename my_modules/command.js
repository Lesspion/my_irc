var Command = {
    checkCommand: function () {
        // switch sur les regex
    }
};

if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = Command;
} else {
    window.Command = Command;
}