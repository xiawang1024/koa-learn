const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const koaJwt = require('koa-jwt');
const logger = require('koa-logger');
const views = require('koa-views');
const helmet = require('helmet');

//helmet安全防护中间件
// app.use(helmet());

//logger
app.use(logger());

//挂载数据库
const { connect, initSchema } = require('./database/index');
(async function() {
	await connect();
	initSchema();
})();

//加载模板引擎
app.use(
	views(path.join(__dirname, './view'), {
		extension: 'pug'
	})
);

//jwt验证
// 当token验证异常时候的处理，如token过期、token错误
app.use(function(ctx, next) {
	return next().catch((err) => {
		if (err.status === 401) {
			ctx.status = 401;
			ctx.body = {
				error: err.originalError ? err.originalError.message : err.message
			};
		} else {
			throw err;
		}
	});
});
const { jwt_secret } = require('./config/index');
app.use(
	koaJwt({
		secret: jwt_secret
	}).unless({ path: [ /\/home/, /\/public/ ] })
);

//使用ctx.body解析中间件
app.use(bodyParser());

//koa-session
app.keys = [ 'some secret hurr' ];
const CONFIG = {
	key: 'koa:sess',
	maxAge: 12 * 60 * 60 * 1000,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
	domain: 'localhost',
	path: '/session'
};
app.use(session(CONFIG, app));

// 加载路由;
const router = require('./router/index');
app.use(router.routes(), router.allowedMethods());

//挂载静态资源
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

app.listen(3000, () => {
	console.log('Listening port 3000');
});
