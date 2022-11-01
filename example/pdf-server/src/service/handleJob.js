const { concurrency } = require('config')
const { onVisit } = require('../middleware/pupMiddle')
const processJob = () => {
  try {
    queue.process(concurrency, async (job, done) => {
      const { url, uid, id, token, originUrl, filename } = job.data
      log({ msg: `process: job.url $${JSON.stringify(job.data)}`, uid })
      try {
        const pdfBuffer = await onVisit({ url, uid, filename })
        done()
      } catch (err) {
        log({
          type: 'error',
          msg: 'process inner err msg: ' + err,
          uid,
        })
        done(err.message)
      }
    })
  } catch (error) {
    log({
      type: 'error',
      msg: 'process outer err msg: ' + error,
    })
  }
}

module.exports = {
  processJob,
}
