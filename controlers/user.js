const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/index');
module.exports = {
	async sign(ctx) {
		const User = mongoose.model('user');
		let postData = ctx.request.body;
		let newUser = await User.findOne({ username: postData.username });
		if (newUser) {
			ctx.body = {
				code: 1,
				success: false,
				message: '该邮箱已注册，请更换其它邮箱！'
			};
		} else {
			newUser = new User(postData);
			let resData = await newUser.save();
			ctx.body = resData;
		}
	},
	async login(ctx) {
		const User = mongoose.model('user');
		let postData = ctx.request.body;
		let resultUser = await User.findOne({ username: postData.username });
		if (resultUser) {
			let isMatch = await resultUser.comparePassword(postData.password);
			if (isMatch) {
				let token = jwt.sign({ data: resultUser }, jwt_secret, { expiresIn: '1h' });
				ctx.body = {
					code: 0,
					message: '登录成功！',
					token,
					userInfo: resultUser
				};
			} else {
				await resultUser.incLoginAttepts();
				ctx.body = {
					code: 1,
					message: '密码错误，请输入正确密码再次登录！'
				};
			}
		} else {
			ctx.body = {
				code: 1,
				message: '改帐号未注册，请先注册！'
			};
		}
	},
	async reset(ctx) {
		const User = mongoose.model('user');
		let postData = ctx.request.body;
		let resultUser = await User.findOne({ username: postData.username });
		if (resultUser) {
			let isMatch = await resultUser.comparePassword(postData.password);
			if (isMatch) {
				let updateUser = await resultUser.setPassword(postData.newPassword);
				ctx.body = {
					code: 0,
					message: '密码修改成功，请用新的密码登录！',
					data: updateUser
				};
			} else {
				ctx.body = {
					code: 1,
					message: '原密码错误，请输入正确密码再次尝试！'
				};
			}
		} else {
			ctx.body = {
				code: 1,
				message: '帐号未注册，请先注册！'
			};
		}
	}
};
