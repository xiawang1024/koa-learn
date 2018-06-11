const axios = require('axios');
const router = require('koa-router')();
const config = {
	client_id: 'a5a91bc2371431e3144e',
	client_secret: '8f3a57231c9f64c2d84e860ab943cd4de9902d31',
	scope: [ 'user' ]
};
module.exports = router
	.get('/login', async (ctx) => {
		let state = Date.now().valueOf();
		let path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scope}&state=${state}`;
		ctx.redirect(path);
	})
	.get('/oauth/callback', async (ctx) => {
		let code = ctx.query.code;
		let path = 'https://github.com/login/oauth/access_token';
		let access_token = await axios({
			method: 'post',
			url: path,
			data: {
				client_id: config.client_id,
				client_secret: config.client_secret,
				code: code
			}
		}).then((res) => {
			let data = res.data;
			let args = data.split('&');
			let arg = args[0].split('=');
			return arg[1];
		});
		let userInfo = await axios({
			method: 'get',
			url: 'https://api.github.com/user',
			params: {
				access_token
			}
		}).then((res) => {
			let data = res.data;
			return data;
		});
		ctx.body = JSON.stringify(userInfo);
	});
