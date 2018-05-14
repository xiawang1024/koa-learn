const api = require('koa-router')();

const { getData, postData } = require('../controlers/request');
const { upload } = require('../controlers/upload');

module.exports = api
	.get('/get/data.json', async (ctx) => {
		ctx.body = {
			success: true,
			data: {
				text: 'hello world'
			}
		};
	})
	.get('/get/user.json', async (ctx) => {
		ctx.body = {
			success: true,
			data: {
				text: 'my name is koa'
			}
		};
	})
	.get('/getData', getData)
	.post('/postData', postData)
	.post('/upload', upload);
