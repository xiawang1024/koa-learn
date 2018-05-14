const uploadFile = require('../util/upload');
const path = require('path');
const process = require('process');
module.exports = {
	async upload(ctx) {
		let result = { success: false };
		let serverFilePath = path.join(process.cwd(), 'static/image');

		result = await uploadFile(ctx, {
			fileType: 'wx1024',
			path: serverFilePath
		});
		ctx.body = result;
	}
};
