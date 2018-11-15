const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10
<<<<<<< HEAD
=======
const MAX_LOGIN_TIMES = 5
const LOCK_TIME = 20 * 60 * 1000 //20分钟
>>>>>>> efa3951d262c25cc6c39215c969e208b31e09fed

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
})

<<<<<<< HEAD
userSchema.virtual('isLocked').get(() => {
=======
userSchema.virtual('isLocked').get(function() {
>>>>>>> efa3951d262c25cc6c39215c969e208b31e09fed
  return !!(this.lockUtil && this.lockUtil > Date.now())
})

userSchema.pre('save', function(next) {
  let user = this
  if (user.isNew) {
    user.meta.createdAt = user.meta.updatedAt = Date.now()
  } else {
    user.meta.updatedAt = Date.now()
  }
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
    if (error) return next(error)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      return next()
    })
  })
})

userSchema.methods = {
  async comparePassword(_password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, this.password, (error, isMatch) => {
        if (error) reject(error)
        else resolve(isMatch)
      })
    })
  },

<<<<<<< HEAD
  async incLoginAttepts() {}
}

module.exports = mongoose.model('user', userSchema)
=======
  async incLoginAttepts() {
    let user = this
    return new Promise((resolve, reject) => {
      let updates = {}
      if (this.lockUtil && this.lockUtil < Date.now()) {
        updates = {
          $set: {
            loginAttepts: 1
          },
          $unset: {
            lockUtil: 1
          }
        }
        user.update(updates, err => {
          if (err) reject(err)
          else resolve(true)
        })
      } else {
        updates = {
          $inc: {
            loginAttepts: 1
          }
        }
        if (user.loginAttepts + 1 > MAX_LOGIN_TIMES && !user.isLocked) {
          updates.$set = {
            lockUtil: Date.now() + LOCK_TIME
          }
        }
        user.update(updates, err => {
          if (err) reject(err)
          else resolve(true)
        })
      }
    })
  }
}

module.exports = mongoose.model('user', userSchema)

//1526617435597
>>>>>>> efa3951d262c25cc6c39215c969e208b31e09fed
