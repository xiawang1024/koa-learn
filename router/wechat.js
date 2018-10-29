const weChat = require('koa-router')()

const { getCode, getUserInfo } = require('../controlers/wechat')

module.exports = weChat
  .get('/getCode', getCode)
  .get('/getUserInfo', getUserInfo)
  .get('/pug', async ctx => {
    await ctx.render('index', { userInfo: 'woshi' })
  })
