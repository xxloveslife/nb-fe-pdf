const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { prefix } = require('config')
const { test } = require('../controller/testController')
const { asyncPrintController } = require('../controller/asyncController')
const { asyncManyController } = require('../controller/asyncManyController')
const {
  syncDownloadController,
} = require('../controller/syncDownloadController')

const app = new Koa()
const router = new Router({
  prefix,
})

app.use(bodyParser())
router.get('/', test)

// 同步单个下载
router.get('/syncDownload', syncDownloadController)

// 异步单个下载
router.get('/asyncPrint', asyncPrintController)

// 异步批量下载
router.post('/asyncManyPrint', asyncManyController)

module.exports = router
