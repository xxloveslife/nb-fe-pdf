const path = require('path')
module.exports = {
  prefix: '/pdf-server/api/pdf/v1',
  TaskTimeout: 2 * 1000 * 60,
  workerNums: 1,
  useLocalOrigin: false, // 使用本地的域名还是ng传入的域名
  concurrency: 3, // 并发
  maxDiedMemory: 2 * 1024, // 0.8G；
  MAX_WSE: 2, // 启动几个浏览器
  showUI: false,
  puppeteerOpt: {
    headless: true,
    timeout: 2000000,
    ignoreHTTPSErrors: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--font-render-hinting=medium',
      '--single-process',
    ],
  },
  taskQueueName: 'PDF_DOWNLOAD_QUEUE',
  redisPrefix: {
    prefix: '{PDF_DOWNLOAD_CLUSTER_QUEUE}',
  },
  redisClusterOpts: {
    enable: false,
    useBullIORedis: true,
    redisCluster: [
      {
        port: 6391,
        host: '10.10.30.133',
        password: 123456,
      },
      {
        port: 6392,
        host: '10.10.30.133',
        password: 123456,
      },
      {
        port: 6393,
        host: '10.10.30.133',
        password: 123456,
      },
      {
        port: 6394,
        host: '10.10.30.133',
        password: 123456,
      },
      {
        port: 6395,
        host: '10.10.30.133',
        password: 123456,
      },
      {
        port: 6396,
        host: '10.10.30.133',
        password: 123456,
      },
    ],
    options: {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
  },

  redisOpt: {
    port: 6379,
    host: '127.0.0.1',
    db: 1,
  },
  serverPort: 8085,
  // 日志输出
  logs: {
    // 日志地址，默认为项目根目录下的 logs 目录
    path: path.resolve(__dirname, '../logs'),
    // 单位字节，默认20MB，单文件超过10MB开始自动分割文件
    // app.log.1 app.log.2 app.log.3 ...
    maxLogSize: 1024 * 1024 * 10 * 10,
    name: 'app',
    level: 'debug', // 'error'
  },
}
