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
       DOMHistory.setMessages(user.getViewRoom(), [].slice.call(document.querySelectorAll('*[data-room="' + user.getViewRoom() + '"]')));
       user.setViewRoom(Command.matches[1]);
       user.allRoom.push(Command.matches[1]);
       if (DOMHistory.allMessages[Command.matches[1]]) {
           console.log('JE suis la : ');
           document.querySelector('.scrollable').innerHTML = "";
           for (var i = 0; i < DOMHistory.getMessages(Command.matches[1]).length; i++) {
               console.log('type : ', typeof DOMHistory.getMessages(Command.matches[1])[i]);
               console.log('val : ', DOMHistory.getMessages(Command.matches[1])[i])
               document.querySelector('.scrollable').appendChild(DOMHistory.getMessages(Command.matches[1])[i]);
           }
       } else {
           document.querySelector('.scrollable').innerHTML = "";
       }
   };
   
   Command.listAction = function () {
       socket.emit('it_s_over_9000');
   };
   
   Command.meAction = function (action) {
       // maybe after
   };
   
   Command.leaveAction = function () {
       user.setViewRoom("");
       socket.emit('justin_leave_r', user.getViewRoom());
   };
   
   Command.userAction = function () {
       socket.emit('how_many');
   };
   
   Command.messageAction = function () {
       // TO-THINK
       socket.emit('this_is_private', Command.matches[1], Command.matches[2], user.nickname);
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
           'users' : that.userAction,
           'msg'   : that.messageAction,
           'help'  : that.helpAction
       };
   };
    
    window.Command = Command;
    
}).call(this);