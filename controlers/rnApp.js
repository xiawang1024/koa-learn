const mongoose = require('mongoose');

module.exports = {
	async rnGet(ctx, next) {
		const User = mongoose.model('user');
		let userList = await User.find({ age: { $lt: 30 } });
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
	},
	async rnAdd(ctx, next) {
		let { name, openId, mobile, icon, age, city } = ctx.request.body;
		const User = mongoose.model('user');
		let newUser = await User.create({ name, openId, mobile, icon, age, city });
		ctx.body = newUser;
		next();
	}
};
