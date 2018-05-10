const router = require('koa-router')()

module.exports = router.get('/helloworld', async (ctx) =>{
    ctx.body = 'hello world'
}).get('/404', async (ctx) => {
    ctx.body = 'Not Found 404'
}).get('/form', async (ctx) => {
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/api/postData">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
})