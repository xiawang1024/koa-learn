const axios = require('axios')
const appID = 'wx177b80ba98f18011'
const secret = 'f8c4c2d3036e1eb4a269c3be4a10a8a6'
module.exports = {
  async getCode(ctx) {
    let redirectUrl = 'http://127.0.0.1:3002/wechat/getUserInfo'
    let authorizeUrl =
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
      `${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=wx1024#wechat_redirect`
    ctx.redirect(authorizeUrl)
  },
  async getUserInfo(ctx) {
    let ctx_query = ctx.query
    let code = ctx_query.code

    let userInfo = await getAccessToken(code)
    console.log('------------------------------------')
    console.log(userInfo)
    console.log('------------------------------------')
    ctx.render('weChat/index', { userInfo: userInfo })
  }
}

function getAccessToken(code) {
  let getAccessTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${secret}&code=${code}&grant_type=authorization_code`
  axios.get(getAccessTokenUrl).then(res => {
    let { access_token, openid } = res.data

    let getUserInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    axios.get(getUserInfoUrl).then(async res => {
      return new Promise((resolve, reject) => {
        resolve(res.data)
      })
    })
  })
}
