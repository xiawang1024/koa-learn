const crypto = require('crypto');

const config = {
	wechat: {
		appID: 'wx39be27f6db2de553',
		appSecret: '015dd4f54580b969f1291dbb52cb8b99',
		token: 'xiawang1024icloudcom'
	}
};

module.exports = () => {
	return async (ctx, next) => {
		console.log(ctx.query);
		const { signature, timestamp, nonce, echostr } = ctx.query;
		const token = config.wechat.token;
		let hash = crypto.createHash('sha1');
		const arr = [ token, timestamp, nonce ].sort();
		hash.update(arr.join(''));
		const shasum = hash.digest('hex');
		console.log(shasum == signature);
		if (shasum === signature) {
			return (ctx.body = echostr);
		} else {
			ctx.status = 501;
			ctx.body = 'invalid signature';
		}
		await next();
	};
};
