const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

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
	renew: false
};
app.use(session(CONFIG, app));

//加载路由
const routers = require('./router/index');
app.use(routers.routes(), routers.allowedMethods());

//挂载静态资源
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

app.listen(3000, () => {
	console.log('Listening port 3000');
});
