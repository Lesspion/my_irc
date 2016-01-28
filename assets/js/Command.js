(function () {
   
   var Command = {
       matches: [],
       init: function (user) {
           this.user  = user;
       },
       analyze: function () {
           console.log(Command.matches);
           var that = this;
           for (var action in Command.list()) {
               if (that.matches[0] && that.matches[0] === action) {
                   Command.list()[that.matches[0]]();
               }
           }
        },
        search: function (str) {
           if (str[0] === '/') {
               Command.matches = str.split('/').join('').split(' ');
               this.analyze();
           } else {
               user.send();
           }
        },
        nickAction: function () {
            socket.emit("say_my_name", Command.matches[1]);
            user.setNickname(Command.matches[1]);
        }
   };
   
   Command.joinAction = function () {
       socket.emit('join_the_dark_side', Command.matches[1]);
       // (switch de vue);
       DOMHistory.setMessages(user.getViewRoom(), document.querySelector('.scrollable'));
       user.setViewRoom(Command.matches[1]);
       user.allRoom.push(Command.matches[1]);
       if (DOMHistory.allMessages[Command.matches[1]]) {
           console.log('JE suis la : ');
           console.log(DOMHistory.allMessages[Command.matches[1]]);
           var scrollable = document.querySelector('.scrollable');
           scrollable.parentNode.replaceChild(scrollable, DOMHistory.getMessages(Command.matches[1]));
       }
   };
   
   Command.listAction = function () {
       socket.emit('it_s_just_over_9000');
   };
   
   Command.meAction = function (action) {
       // maybe after
   };
   
   Command.leaveAction = function () {
       socket.emit('justin_leave_r', Command.matches[1]);
   };
   
   Command.userAction = function () {
       
   };
   
   Command.messageAction = function () {
       // TO-THINK
   };
   
   Command.helpAction = function () {
       socket.emit('help_me');
   };
   
   Command.list = function () {
       var that = this;
       return {
           'join'  : that.joinAction,
           'list'  : that.listAction,
           'me'    : that.meAction,
           'nick'  : that.nickAction,
           'part'  : that.leaveAction,
           'user' : that.userAction,
           'msg'   : that.messageAction,
           'help'  : that.helpAction
       };
   };
    
    window.Command = Command;
    
}).call(this);