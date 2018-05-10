const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')

//使用ctx.body解析中间件
app.use(bodyParser())

//加载路由
const routers = require('./router/index')
app.use(routers.routes(), routers.allowedMethods())


app.listen(3000,()=> {
    console.log('Listening port 3000')
})