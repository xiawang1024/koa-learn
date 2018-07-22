const mongoose = require('mongoose');

module.exports = {
	async rnGet(ctx, next) {
		let { page, count } = ctx.params;
		console.log(count);
		const User = mongoose.model('user');
		let userList = await User.find({}).limit(parseInt(count)).skip(parseInt(page));
		ctx.body = userList;
		next();
	},
	async rnEdit(ctx, next) {
		let data = ctx.request.body;
	},
	async rnDelete(ctx, next) {
		const User = mongoose.model('user');
		let query = ctx.request.body;
		let deleteUser = await User.findOneAndRemove({ openId: query.openId });
		ctx.body = JSON.stringify({ status: 0 });
	}
};
