const config = require('config')
const log4js = require('log4js')
const path = require('path')

// const env = process.env.NODE_ENV || 'development'

let cfg = {
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  appenders: {
    [config.logs.name]: {
      type : 'file',
      filename : path.join(config.logs.path, `${config.logs.name}.log`),
      maxLogSize : config.logs.maxLogSize,
      backups : 10,
      category : config.logs.name
    }
  },
  categories: {
    default: {
      appenders: [config.logs.name],
      level: config.logs.level
    }
  },
  replaceConsole: true
}

log4js.configure(cfg)

const logger = log4js.getLogger('app')
// logger.level = env === 'development' ? 'DEBUG' : 'ERROR'
logger.level = 'debug'

module.exports = process.env.NODE_ENV === 'development' ? console : logger
