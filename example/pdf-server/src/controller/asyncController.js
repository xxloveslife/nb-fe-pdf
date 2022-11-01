const { getHost, formatFetchUrl, log } = require('../utils')
const uuid = require('uuid')
exports.asyncPrintController = async (ctx, next) => {
  const params = ctx.query
  ctx.params = params
  const { downloadFileName } = params
  const pid = process.pid
  let uid = uuid.v4()
  log({
    type: 'info',
    msg: `step1 puppeteer params ${JSON.stringify(params)}`,
    uid,
  })
  const originUrl = getHost(ctx, params.originUrl, uid)
  const downloadUrl = formatFetchUrl(originUrl, params)
  log({
    type: 'info',
    msg: `step2 downloadUrl => ${JSON.stringify(downloadUrl)}`,
    uid,
  })
  const name = downloadFileName.split('.')[0]
  const pdfName = `${name}-${uid}`
  await queue.add(
    {
      jobId: pdfName,
      filename: `${pdfName}.pdf`,
      url: downloadUrl,
      pid,
      uid,
    },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 50000,
      },
    },
  )

  ctx.status = 200
  ctx.body = {
    code: 0,
    success: true,
    msg: `请稍等，${pdfName} 报告正在生成`,
  }
}
