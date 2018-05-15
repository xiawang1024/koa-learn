const router = require('koa-router')();

module.exports = router.get('/', async (ctx) => {
	let html = `
        <ul>
            <li><a href="/page/helloworld">/page/helloworld</a></li>
            <li><a href="/page/form">/page/form</a></li>
            <li><a href="/page/404">/page/404</a></li>
            <li><a href="/js/index.js">/js/index.js</a></li>
            <li><a href="/api/get/data.json">/api/get/data.json</a></li>
            <li><a href="/api/get/user.json">/api/get/user.json</a></li>
            <li><a href="/api/getData?name=wangxia&age=28">/api/getData</a></li>
            <li><a href="/cookie/setcookie">/cookie</a></li>
            <li><a href="/cookie/session">/session</a></li>
            <li><a href="/upload/index.html">/upload</a></li>
            <li><a href="/sign/index.html">/sign</a></li>
            <li><a href="/sign/login.html">/login</a></li>
        </ul>
    `;
	ctx.body = html;
});
