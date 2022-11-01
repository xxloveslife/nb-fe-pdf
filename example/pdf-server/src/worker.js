const Koa = require('koa')
const { onInit, onVisit } = require('./middleware/pupMiddle')
const { log, isProd } = require('./utils')
const cors = require('koa2-cors')
const uuid = require('uuid')
const router = require('./router')
const koaBody = require('koa-body')
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { KoaAdapter } = require('@bull-board/koa')
const { prefix, serverPort, showUI } = require('config')
const { initQueue } = require('./service/queue')
const path = require('path')
const static = require('koa-static')
const { processJob } = require('./service/handleJob')
const port = serverPort || 8085

const app = new Koa()
app.use(static(path.resolve(__dirname, '../static/pdf')))
app.use(
  koaBody({
    multipart: true,
  }),
)
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

const queue = initQueue()
global.log = log
global.queue = queue

if (showUI) {
  const serverAdapter = new KoaAdapter(`${prefix}/ui`)
  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter,
  })
  serverAdapter.setBasePath(`${prefix}/ui`)
  app.use(serverAdapter.registerPlugin())
}

app.timeout = 1200 * 1000

const server = () => {
  app.listen(port, async () => {
    const slogan = 'pdf server run at ' + port
    const uid = uuid.v4()
    await onInit()
    await processJob()
    log({ msg: `${slogan}`, uid })
  })
}

module.exports = {
  server,
}
