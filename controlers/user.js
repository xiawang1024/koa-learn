const mongoose = require('mongoose');
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
				ctx.body = {
					code: 0,
					message: '登录成功！',
					userInfo: resultUser
				};
			} else {
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
		const User = mongoose.model('user')
		let postData = ctx.request.body
		let resultUser = await User.findOne({ username: postData.username });
		if(resultUser) {
			let isMatch = await resultUser.comparePassword(postData.password)
			if(isMatch) {
				let updateUser = await User.update({username:postData.username},{$set:{password:postData.newPassword}})
				ctx.body = {
					code:0,
					message:'密码修改成功，请用新的密码登录！',
					data:updateUser
				}

			}else{
				ctx.body = {
					code: 1,
					message: '原密码错误，请输入正确密码再次尝试！'
				};
			}
		}else {
			ctx.body = {
				code: 1,
				message: '帐号未注册，请先注册！'
			};
		}
	}
};
