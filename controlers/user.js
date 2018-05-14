const mongoose = require('mongoose');
module.exports = {
	async sign(ctx) {
		const User = mongoose.model('user');
		let postData = ctx.request.body;

		let newUser = new User(postData);
		let resData = await newUser.save();
		ctx.body = resData;
	}
};
