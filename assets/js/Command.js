(function () {
   
   var Command = {
       reg: null,
       matches: null,
   };
   
   Command.analyze = function (str) {
       console.log(this.matches)
       for (var action in Command.list()) {
           if (this.matches[0] && this.matches[0] === action) {
               Command.list()[this.matched[0]](this.matched[1]);
           }
       }
   };
   
   Command.search = function (str) {
       this.reg = new RegExp('#^/(.*)\s(.*)$');
       this.matches = this.reg.exec(str);
   };
   
   Command.joinAction = function (channelName) {
       socket.emit('join_the_dark_side', channelName);
       // (switch de vue);
   };
   
   Command.listAction = function () {
       socket.emit('it_s_just_over_9000');
   };
   
   Command.meAction = function (action) {
       // maybe after
   };
   
   Command.nickAction = function (newNick) {
       socket.emit('say_my_name', newNick);
       // save in local user.setNickname(newNick);
   };
   
   Command.leaveAction = function (channelName) {
       socket.emit('justin_leave_r', channelName);
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