const router = require('koa-router')()

module.exports = router.get('/helloworld', async (ctx) =>{
    ctx.body = 'hello world'
}).get('/404', async (ctx) => {
    ctx.body = 'Not Found 404'
})