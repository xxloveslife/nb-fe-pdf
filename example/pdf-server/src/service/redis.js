const Redis = require('ioredis')
const { redisOpt, redisClusterOpts } = require('config')
const { log } = require('../utils')

const redisClient = redisClusterOpts.enable
  ? new Redis.Cluster(redisClusterOpts.redisCluster, {
      ...redisClusterOpts.options,
    })
  : new Redis(redisOpt, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    })

redisClient.on('connect', (data) => {
  log({ type: 'info', msg: 'redis connected success' })
})

redisClient.on('ready', (data) => {
  log({ type: 'info', msg: 'redis ready success' })
})

redisClient.on('error', (error) => {
  log({ type: 'error', msg: 'redis  error :' + JSON.stringify(error) })
})
module.exports = redisClient
