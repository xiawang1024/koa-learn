const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	openId: String,
	mobile: String,
	icon: String,
	age: Number,
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			default: Date.now()
		}
	}
});
userSchema.add({ city: 'string' });
userSchema.pre('save', function(next) {
	let user = this;
	if (user.isNew) {
		user.meta.createdAt = user.meta.updatedAt = Date.now();
	} else {
		user.meta.updatedAt = Date.now();
	}
	next();
});

userSchema.pre('findOneAndUpdate', function(next) {
	let user = this;
	user.update({}, { $set: { meta: { updatedAt: Date.now() } } });
	next();
});
module.exports = mongoose.model('user', userSchema);
