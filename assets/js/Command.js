(function () {
   
   var Command = {
       socket: null,
       reg: null,
       matches: null,
   };
   
   Command.init = function (socket) {
       this.socket = socket;
   };
   
   Command.analyze = function (str) {
       console.log(this.matches)
       for (var action in Command.list()) {
           if (this.matches[0] && this.matches[0] === action) {
               Command.list()[this.matched[0]]();
           }
       }
   };
   
   Command.search = function (str) {
       this.reg = new RegExp('#^/(.*)\s(.*)$');
       this.matches = this.reg.exec(str);
       this.analyze(str);
   };
   
   Command.joinAction = function () {
       this.socket.emit('join_the_dark_side', this.matches[1]);
       // (switch de vue);
   };
   
   Command.listAction = function () {
       this.socket.emit('it_s_just_over_9000');
   };
   
   Command.meAction = function (action) {
       // maybe after
   };
   
   Command.nickAction = function () {
       this.socket.emit('say_my_name', this.matches[1]);
       // save in local user.setNickname(newNick);
   };
   
   Command.leaveAction = function () {
       this.socket.emit('justin_leave_r', this.matches[1]);
   };
   
   Command.privateMessageAction = function () {
       // TO-THINK
   };
   
   Command.list = function () {
       var that = this;
       return {
           'join'  : that.joinAction,
           'list'  : that.listAction,
           'me'    : that.meAction,
           'nick'  : that.nickAction,
           'part'  : that.leaveAction,
           'users' : that.privateMessageAction
       };
   };
    
    window.Command = Command;
    
});