const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

// //使用ctx.body解析中间件
// app.use(bodyParser());

// //koa-session
// app.keys = [ 'some secret hurr' ];
// const CONFIG = {
// 	key: 'koa:sess',
// 	maxAge: 12 * 60 * 60 * 1000,
// 	overwrite: true,
// 	httpOnly: true,
// 	signed: true,
// 	rolling: false,
// 	renew: false,
// 	domain: 'localhost',
// 	path: '/session'
// };
// app.use(session(CONFIG, app));

// 加载路由;
const routers = require('./router/index');
app.use(routers.routes(), routers.allowedMethods());

//挂载静态资源
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

const { uploadFile } = require('./util/upload');

app.use(async (ctx) => {
	if (ctx.method === 'GET') {
		let title = 'upload pic async';
		await ctx.render('index', {
			title
		});
	} else if (ctx.url === '/api/upload' && ctx.method === 'POST') {
		// 上传文件请求处理
		let result = { success: false };
		let serverFilePath = path.join(__dirname, 'static/image');

		// 上传文件事件
		result = await uploadFile(ctx, {
			fileType: 'album',
			path: serverFilePath
		});
		ctx.body = result;
	} else {
		// 其他请求显示404
		ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
	}
});

app.listen(3000, () => {
	console.log('Listening port 3000');
});
