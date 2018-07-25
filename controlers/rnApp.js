const mongoose = require('mongoose');

module.exports = {
	async rnGet(ctx, next) {
		const User = mongoose.model('user');
		let { name } = ctx.params;
		let userList = null;
		if (name === 'all') {
			userList = await User.find({});
		} else {
			userList = await User.find({ name });
		}
		ctx.body = userList;
		next();
	},
	async rnEdit(ctx, next) {
		const User = mongoose.model('user');
		let { _id, name, mobile } = ctx.request.body;
		let updateUser = await User.findByIdAndUpdate({ _id }, { name, mobile });
		console.log(updateUser);
		ctx.body = JSON.stringify({ status: 0, updateUser });
		next();
	},
	async rnDelete(ctx, next) {
		const User = mongoose.model('user');
		let { openId } = ctx.request.body;
		let deleteUser = await User.findOneAndRemove({ openId });
		ctx.body = JSON.stringify({ status: 0, deleteUser });
	},
	async rnAdd(ctx, next) {
		let { name, openId, mobile, icon, age, city } = ctx.request.body;
		const User = mongoose.model('user');
		let newUser = await User.create({ name, openId, mobile, icon, age, city });
		ctx.body = newUser;
		next();
	}
};
