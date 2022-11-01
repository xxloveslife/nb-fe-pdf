const Queue = require('bull')

const {
  taskQueueName,
  PDF_DOWNLOAD_CLUSTER_QUEUE,
  TaskTimeout,
  redisClusterOpts,
  redisOpt,
} = require('config')
const { isProd, log } = require('../utils')
const { reportReason } = require('./base-qianhai')

const setRedis = () => {
  const redisConfig = redisClusterOpts.useBullIORedis
    ? { redis: redisOpt }
    : {
        createClient: function createClient() {
          return require('./redis')
        },
      }
  log({ msg: `redisClusterOpts: ${JSON.stringify(redisClusterOpts)}` })
  log({ msg: `redisConfig: ${JSON.stringify(redisConfig)}` })
  return redisConfig
}

const initQueue = () => {
  global.qname = taskQueueName
  const queue = new Queue(taskQueueName, {
    prefix: `${PDF_DOWNLOAD_CLUSTER_QUEUE}`,
    ...setRedis(),
    limiter: {
      max: 20000,
      duration: 1000,
    },
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: !isProd(),
      backoff: {
        type: 'fixed',
        delay: 30000,
      },
      timeout: TaskTimeout,
    },
  })
  queue.on('failed', jobFaild)
  return queue
}

async function jobFaild(job, result) {
  try {
    log({
      type: 'error',
      msg: `job： ${JSON.stringify(job.data)}, result: ${result}`,
    })
    const { id, token, originUrl } = job.data
    const ret = await reportReason({
      originUrl,
      data: { id, errorReason: result },
      token,
    })
    log({
      msg: 'pdf faild reportReason 接口响应' + JSON.stringify(ret),
    })
  } catch (error) {
    log({
      type: 'error',
      msg: 'pdf faild reportReason 接口 error ' + error,
    })
  }
}

module.exports = {
  initQueue,
}
