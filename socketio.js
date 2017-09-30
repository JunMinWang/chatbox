var io = require('./libs/socketio');
module.exports = function() {
    io.on('connection', function(socket){
        require('./socketroutes/index.js')(socket);
    });
    return io;
}