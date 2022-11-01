const cluster = require('cluster')
const worker = require('./worker')
const logger = require('./logger')
const uuid = require('uuid')
const { getWrokerNums, log, bitToMB } = require('./utils')
const { maxDiedMemory, redisClusterOpts, workerNums } = require('config')
// let workerNums = getWrokerNums()
const processMemorySize = bitToMB(process.memoryUsage().rss)

if (cluster.isMaster) {
  log({ type: 'info', msg: 'workerNums: ' + workerNums })
  for (let i = 0; i < workerNums; i++) {
    createWorker()
  }

  cluster.on('exit', (worker, code, signal) => {
    log({
      type: 'error',
      msg: 'worker.process.pid: ' + worker.process.pid + ' died',
    })
    setTimeout(() => {
      createWorker()
    }, 5000)
  })

  function createWorker() {
    // 创建子进程进行心跳监控
    let worker = cluster.fork()
    let uid = uuid.v4()
    log({ type: 'info', msg: `new worker ===> ${worker.process.pid}`, uid })

    let missed = 0 // 没有回应的ping次数

    let timer = setInterval(() => {
      process.send('ping#' + worker.process.pid)
      if (missed === 3) {
        clearInterval(timer)
        log({
          type: 'error',
          msg: `worker.process.pid: ${worker.process.pid} -> died down, processMemorySize 为${processMemorySize}MB`,
          uid,
        })
        process.kill(worker.process.pid)
        return
      }
      missed++

      worker.send({ type: `ping#${worker.process.pid}`, uid })
    }, 10000)

    worker.on('message', ({ type, uid }) => {
      // 确认心跳回应
      if (type === `pong#${worker.process.pid}`) {
        // log({ type: 'info', msg: `pong#${worker.process.pid}`, uid, cancel: true })
        missed--
      }
    })

    worker.on('exit', () => {
      clearInterval(timer)
    })
  }
} else {
  // 异常处理
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    log({
      type: 'error',
      msg: `uncaughtExceptionMonitor  err: ${JSON.stringify(
        err,
      )}, origin: ${origin}`,
    })
  })

  // 回应心跳信息
  process.on('message', ({ type, uid }) => {
    if (type === `ping#${process.pid}`) {
      // log({ type: 'info', msg: `ping#${process.pid}`, uid })
      process.send({ type: `pong#${process.pid}`, uid })
    }
  })

  log({
    msg: `worker: ${process.pid} 运行内存为: ${processMemorySize}MB`,
  })

  if (processMemorySize > maxDiedMemory) {
    log({
      type: 'error',
      msg: `检测到内存过大，内存为 process.memoryUsage().rss: ${processMemorySize}`,
    })
    process.exit(1)
  }

  worker.server()
}
