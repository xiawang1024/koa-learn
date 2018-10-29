const http = require('http')
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const static = require('koa-static')
const logger = require('koa-logger')
const views = require('koa-views')

//logger
app.use(logger())

//加载模板引擎
app.use(
  views(path.join(__dirname, './view'), {
    extension: 'pug'
  })
)

// 加载路由;
const router = require('./router/index')
app.use(router.routes(), router.allowedMethods())

//挂载静态资源
const staticPath = './static'
app.use(static(path.join(__dirname, staticPath)))

app.listen(3002)
