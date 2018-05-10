/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const page = require('./page')
const api = require('./api')

router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router