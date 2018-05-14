const router = require('koa-router')();

module.exports = router
	.get('/setcookie', async (ctx) => {
		ctx.cookies.set('cid', 'hello koa', {
			domain: 'localhost', //写cookie所在的域名
			path: '/cookie', //写cookie所在的路径
			maxAge: 60 * 1000, // cookie有效时长
			httpOnly: false, // 是否只用于http请求中获取
			overwrite: false // 是否允许重写
		});
		ctx.body = 'cookie set ok';
	})
	.get('/session', async (ctx) => {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
		ctx.body = `${n} views`;
	});
