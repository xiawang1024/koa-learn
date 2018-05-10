const Koa = require('koa')
const app = new Koa()

//加载路由
const routers = require('./router/index')
app.use(routers.routes(), routers.allowedMethods())


app.listen(3000,()=> {
    console.log('Listening port 3000')
})