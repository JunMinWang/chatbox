var io = require('../libs/socketio');
var userlist = [];
module.exports = function(socket) {
    socket.on('joinchat', function(data) {
        console.log(data.name + '加入聊天室');
        userlist.push({name: data.name});
        console.log('userlist:'+ userlist);
        io.emit('joinchat', {name: data.name, userlist: userlist});
    });

    socket.on('sendmsg', function(data) {
        console.log(data.user + ' say ' + data.msg);
        io.emit('onmsg', data);
    });

    socket.on('close', function(data) {
        deleteFromUserlist(data.user);
        console.log(data.user + '已經離線！');
        io.emit('onclose', {name: data.user, userlist: userlist});
    });

    function deleteFromUserlist(username) {
        var arraylength = userlist.length;
        for(var i=0 ; i<arraylength ; i++) {
            var obj = userlist[i];

            if(username === userlist[i].name) {
                userlist.splice(i, 1);
                break;
            }
        }
    }
}