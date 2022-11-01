const { getHost, log } = require('../utils')
const uuid = require('uuid')
exports.asyncManyController = async (ctx, next) => {
  log({ msg: `/asyncManyPrint params: ${JSON.stringify(ctx.request.body)}` })
  let { links, originUrl, token } = ctx.request.body
  if (links && links.length > 0) {
    const uid = uuid.v4()
    ctx.uid = uid
    const origin = getHost(ctx, originUrl, uid)
    links = links.map((link) => {
      return {
        data: {
          jobId: link.id,
          url: `${origin}${link.pageRouter}?token=${token}`,
          uid,
          id: link.id,
          token,
          originUrl: origin,
        },
      }
    })
    await queue.addBulk(links)
    // console.log('addBulk ret', ret)
    ctx.body = {
      code: 0,
      success: true,
      msg: `请稍等，报告正在生成`,
    }
  } else {
    ctx.status = 500
    ctx.body = {
      code: 10020,
      success: false,
      msg: `缺少必要参数`,
    }
  }
}
