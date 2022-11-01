const { getHost, formatFetchUrl, log } = require('../utils')
const { onVisit } = require('../middleware/pupMiddle')
const uuid = require('uuid')

exports.syncDownloadController = async (ctx) => {
  const uid = uuid.v4()
  const params = ctx.query
  const originUrl = getHost(ctx, params.originUrl, uid)
  const downloadUrl = formatFetchUrl(originUrl, params)
  log({
    type: 'info',
    msg: 'syncDownloadController downloadUrl' + JSON.stringify(params),
  })
  const pdfBuffer = await onVisit({ url: downloadUrl, uid })
  ctx.set({
    'Content-Disposition': `attachment;filename=xx.pdf`,
    'Content-Type': 'application/octet-stream',
  })
  ctx.body = pdfBuffer
}
