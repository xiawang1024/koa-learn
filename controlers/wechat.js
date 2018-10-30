const axios = require('axios')
const appID = 'wx177b80ba98f18011'
const secret = 'f8c4c2d3036e1eb4a269c3be4a10a8a6'
module.exports = {
  async getCode(ctx) {
    let redirectUrl = 'https://we.wx1024.club/wechat/getUserInfo'
    let authorizeUrl =
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
      `${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=wx1024#wechat_redirect`
    ctx.redirect(authorizeUrl)
  },
  async getUserInfo(ctx) {
    try {
      let { code } = ctx.query
      let getAccessTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${secret}&code=${code}&grant_type=authorization_code`
      let accessTokenRes = await axios.get(getAccessTokenUrl)
      let { access_token, openid } = accessTokenRes.data
      let getUserInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
      let userInfoRes = await axios.get(getUserInfoUrl)
      await ctx.render('weChat/index', { userInfo: userInfoRes.data })
    } catch (error) {
      console.log(error)
    }
  }
}
