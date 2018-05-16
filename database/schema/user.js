const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	loginAttepts: {
		type: Number,
		required: true,
		default: 0
	},
	lockUtil: Number,
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

userSchema.virtual('isLocked').get(() => {
	return !!(this.lockUtil && this.lockUtil > Date.now());
});

userSchema.pre('save', function(next) {
	let user = this;
	if (user.isNew) {
		user.meta.createdAt = user.meta.updatedAt = Date.now();
	} else {
		user.meta.updatedAt = Date.now();
	}
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
		if (error) return next(error);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			return next();
		});
	});
});

userSchema.methods = {
	async comparePassword(_password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(_password, this.password, (error, isMatch) => {
				if (error) reject(error);
				else resolve(isMatch);
			});
		});
	},
	async setPassword(newPassword) {
		let user = this;
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
				if (error) return reject(error);

				bcrypt.hash(newPassword, salt, async function(err, hash) {
					if (err) return reject(err);
					user.password = hash;
					resolve(user);
				});
			});
		});
	},
	async incLoginAttepts() {}
};

userSchema.statics = {
	async updatePassword(query, password) {
		return new Promise(async (resolve, reject) => {
			await this.update(query, { $set: { password } });
			resolve();
		});
	}
};

module.exports = mongoose.model('user', userSchema);

// $2a$10$EqDhpcnalZ.UnMdpfdRE6ebrcIqDoG28dM7CcAj235RQEfgthnFma
