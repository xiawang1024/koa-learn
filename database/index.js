const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const { mongoDBurl } = require('../config/index');
mongoose.Promise = global.Promise;

module.exports = {
	async initSchema() {
		// glob.sync(path.join(__dirname, './schema', '**/*.js')).forEach(require);
		require('./schema/hndt');
	},
	async connect() {
		let maxConnectTimes = 0;
		return new Promise((resolve, reject) => {
			mongoose.connect(mongoDBurl);

			const db = mongoose.connection;

			db.on('disconnected', () => {
				maxConnectTimes++;
				if (maxConnectTimes < 5) {
					mongoose.connect(mongoDBurl);
				} else {
					throw new Error('MongoDB disconnected');
					reject();
				}
			});

			db.on('error', () => {
				maxConnectTimes++;
				if (maxConnectTimes < 5) {
					mongoose.connect(mongoDBurl);
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
