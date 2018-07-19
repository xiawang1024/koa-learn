const mongoose = require('mongoose');
module.exports = {
	async rnGet(ctx, next) {
		const User = mongoose.model('user');
		let userList = await User.find({});
		ctx.body = userList;
		next();
	},
	async rnEdit(ctx, next) {
		let data = ctx.request.body;
	}
};
