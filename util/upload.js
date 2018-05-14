const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {Boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
}
/**
 * 获取上传文件的后缀名
 * @param {String} fileName 获取上传文件的后缀名
 * @return {string}         文件后缀名
 */
function getSuffixName(fileName) {
	let nameList = fileName.split('.');
	return nameList[nameList.length - 1];
}
/**
 * 上传文件 
 * @param {Object} ctx koa上下文 
 * @param {Object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
	let req = ctx.req;
	let res = ctx.res;
	let busboy = new Busboy({ headers: req.headers });
	// 获取类型
	let fileType = options.fileType || 'common';
	let filePath = path.join(options.path, fileType);
	let mkdirResult = mkdirsSync(filePath);
	return new Promise((resolve, reject) => {
		console.log('文件上传中...');
		let result = {
			success: false,
			message: '',
			data: null
		};

		// 解析请求文件事件
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log('File [' + fieldname + ']: filename: ' + filename);
			file.on('data', function(data) {
				console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
			});
			file.on('end', function() {
				console.log('File [' + fieldname + '] Finished');
			});
		});
		// busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		// 	console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
		// 	let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename); //toString(16) 数字以十六进制值显示
		// 	let _uploadFilePath = path.join(filePath, fileName);
		// 	let saveTo = path.join(_uploadFilePath);

		// 	//文件保存到指定路径
		// 	file.pipe(fs.createWriteStream(saveTo));

		// 	//文件写入事件结束
		// 	file.on('end', function() {
		// 		result.success = true;
		// 		result.message = '文件上传成功';
		// 		result.data = {
		// 			picUrl: '//${ctx.host}/image/${fileType}/${fileName}'
		// 		};
		// 		console.log('文件上传成功');
		// 		resolve(result);
		// 	});
		// });
		// // 解析表单中其他字段信息
		// busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
		// 	console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
		// 	result.data[fieldname] = inspect(val);
		// });
		//解析结束事件
		busboy.on('finish', function() {
			console.log('文件上传结束');
			resolve(result);
		});
		// 解析出错事件
		busboy.on('error', function(err) {
			console.log('文件长传出错');
			reject(result);
		});

		req.pipe(busboy);
	});
}

module.exports = uploadFile;
