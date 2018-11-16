const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/index')
module.exports = {
  async sign(ctx) {
    const User = mongoose.model('user')
    let postData = ctx.request.body
    let newUser = await User.findOne({ username: postData.username })
    if (newUser) {
      ctx.body = {
        code: 1,
        success: false,
        message: '账号已注册，请直接登录！'
      }
    } else {
      newUser = new User(postData)
      let resData = await newUser.save()
      ctx.body = {
        code: 0,
        message: '注册成功！',
        data: resData
      }
    }
  },
  async login(ctx) {
    const User = mongoose.model('user')
    let postData = ctx.request.body
    let resultUser = await User.findOne({ username: postData.username })
    if (resultUser) {
      // 如果账号被锁定
      if (resultUser.isLocked) {
        ctx.body = {
          code: 1,
          message: '密码输入错误次数过多，账号已锁定，请20分钟后再试！'
        }
      } else {
        //账号未锁定
        let isMatch = await resultUser.comparePassword(postData.password)
        // 密码匹配
        if (isMatch) {
          //生成token，1小时过期
          let token = jwt.sign({ data: resultUser }, jwt_secret, {
            expiresIn: '1h'
          })
          ctx.body = {
            code: 0,
            message: '登录成功！',
            token,
            userInfo: resultUser
          }
        } else {
          //密码错误，登录次数累加
          await resultUser.incLoginAttepts()
          ctx.body = {
            code: 1,
            message: '密码错误，请输入正确密码再次登录！'
          }
        }
      }
    } else {
      ctx.body = {
        code: 1,
        message: '改帐号未注册，请先注册！'
      }
    }
  },
  async reset(ctx) {
    const User = mongoose.model('user')
    let postData = ctx.request.body
    let resultUser = await User.findOne({ username: postData.username })
    if (resultUser) {
      let isMatch = await resultUser.comparePassword(postData.password)
      if (isMatch) {
        resultUser.password = postData.newPassword
        let updateUser = await resultUser.save()
        if (updateUser) {
          ctx.body = {
            code: 0,
            message: '密码修改成功！',
            data: updateUser
          }
        } else {
          ctx.body = {
            code: 0,
            message: '密码修改失败！'
          }
        }
        console.log(updateUser)
      } else {
        ctx.body = {
          code: 1,
          message: '原密码错误！'
        }
      }
    } else {
      ctx.body = {
        code: 1,
        message: '帐号未注册！'
      }
    }
  }
}
