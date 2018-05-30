const socketIo = require('socket.io');

module.exports = {
	initSocket(http) {
		const io = socketIo(http);
		io.on('connection', (socket) => {
			console.log('a user connected');
			socket.on('disconnect', () => {
				console.log('user disconnected');
			});
			socket.emit('hi');
			socket.broadcast.emit('a user coming');
			socket.on('chat message', function(msg) {
				console.log(msg);
				io.emit('chat message', msg);
			});
		});
	}
};
