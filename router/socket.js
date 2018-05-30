const socketIo = require('socket.io');

module.exports = {
	initSocket(http) {
		const io = socketIo(http);
		io.on('connection', (socket) => {
			socket.broadcast.emit('user connected', 'user connected');
			socket.emit('yourself msg', '私人消息');
			io.emit('all msg', '公开消息');
		});
	}
};
