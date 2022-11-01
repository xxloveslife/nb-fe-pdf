const { log } = require('../utils')
const uuid = require('uuid')

/**
 * 测试接口
 * @param {*} ctx
 */
exports.test = async (ctx) => {
  ctx.body = {
    status: 200,
    msg: 'pdf server ready',
  }
  const uid = uuid.v4()
  log({ msg: `test api pdf server ready`, uid })
}
