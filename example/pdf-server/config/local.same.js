const path = require('path')
module.exports = {
    production: false,
    puppeteer: {
        headless: true,
        timeout: 120000
    },
    server: {
        port: 8085
    },
     // 日志输出
    logs: {
      // 日志地址，默认为项目根目录下的 logs 目录
      path: path.resolve(__dirname, '../logs'),
      // 单位字节，默认20MB，单文件超过10MB开始自动分割文件
      // app.log.1 app.log.2 app.log.3 ...
      maxLogSize: 1024 * 1024 * 10 * 10,
      name: 'app',
      level: 'debug' // 'error'
    },

}