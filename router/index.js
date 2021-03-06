/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const home = require('./home');
const page = require('./page');
const api = require('./api');
const cookie = require('./cookie.js');
const github = require('./github');

router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/cookie', cookie.routes(), cookie.allowedMethods());
router.use('/github', github.routes(), github.allowedMethods());

module.exports = router;
