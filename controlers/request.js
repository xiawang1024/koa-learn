module.exports = {
    async getData(ctx) {
        let url = ctx.url
        let ctx_query = ctx.query
        let ctx_querystring = ctx.querystring

        ctx.body = {
            url,
            ctx_query,
            ctx_querystring
        }
    },

    async postData(ctx) {
        let postData = ctx.request.body
        ctx.body = postData
    }
}