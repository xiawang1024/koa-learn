const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
mongoose.Promise = global.Promise;
const config = {
	dbUrl: 'mongodb://localhost:27017/login'
};

module.exports = {
	async initSchema() {
		glob.sync(path.join(__dirname, './schema', '**/*.js')).forEach(require);
	},
	async connect() {
		let maxConnectTimes = 0;
		return new Promise((resolve, reject) => {
			mongoose.connect(config.dbUrl);

			const db = mongoose.connection;

			db.on('disconnected', () => {
				maxConnectTimes++;
				if (maxConnectTimes < 5) {
					mongoose.connect(config.dbUrl);
				} else {
					throw new Error('MongoDB disconnected');
					reject();
				}
			});

			db.on('error', () => {
				maxConnectTimes++;
				if (maxConnectTimes < 5) {
					mongoose.connect(config.dbUrl);
				} else {
					throw new Error('MongoDB is not work');
					reject();
				}
			});

			db.once('open', () => {
				console.log('MongoDB connected successfully');
				resolve();
			});
		});
	}
};
