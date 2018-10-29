/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const wechat = require('./wechat')

router.use('/wechat', wechat.routes(), wechat.allowedMethods())

module.exports = router
