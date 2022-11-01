const os = require('os')
const interfaces = os.networkInterfaces() //服务器本机地址
const path = require('path')
const qs = require('qs')
const uuid = require('uuid')
const logger = require('../logger')
const { useLocalOrigin } = require('config')

const log = function log({ type, msg, uid }) {
  let time = new Date().toLocaleString()
  if (typeof type === 'undefined') {
    type = 'info'
  }
  if (typeof uid === 'undefined') {
    uid = uuid.v4()
  }
  if (process.env.NODE_ENV === 'production') {
    logger && logger[type](uid, msg, time)
  }
  if (Object.prototype.toString.call(msg) === 'object Object') {
    msg = JSON.stringify(msg)
  }
  console.log(msg, uid, time)
}

const getLocalIP = () => {
  let IPAdress = ''
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        IPAdress = alias.address
      }
    }
  }
  return IPAdress
}

// 格式化请求url
const formatFetchUrl = (originUrl, params) => {
  return `${originUrl}${params.pageRouter}`
}

const resolve = (pathname) => path.resolve(__dirname, pathname)

const currentTime = () => {
  let date = new Date()
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}~${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

// 在amc-pdf-server 会做判断，无头浏览器用那个请求域名；
// 如果ng 配置了X-Forwarded-Host 和 X-Forwarded-Protocol 会用得到的，如果没有配置会用这里传入的originUrl字段
const getHost = (ctx, originUrl, uid) => {
  let xprot = ctx.req.headers['x-forwarded-proto']
  let xhost = ctx.req.headers['x-forwarded-host']
  log({ msg: `get request xprot: ${xprot}; get request xhost:${xhost}`, uid })
  log({ msg: `useLocalOrigin 设置: ${useLocalOrigin}` })
  let url
  if (useLocalOrigin) {
    url = originUrl
  } else {
    url = xhost ? `${xprot}://${xhost}` : originUrl
  }

  log({ msg: `request xhost url-----${url}`, uid })
  // return h.replace("https", "http")
  return url
}

const errorInfo = (ctx, msg) => {
  ctx.status = 500
  ctx.body = {
    status: 500,
    msg: msg,
    data: null,
  }
}

const getBufferSizeToMB = (buffer) => buffer.byteLength / 1024 / 1024

const bitToMB = (bf, unit) => {
  if (unit) return (bf / 1024 / 1024).toFixed(2) + 'MB'
  return (bf / 1024 / 1024).toFixed(2)
}

const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

const getWrokerNums = () => {
  let workerNums = 1
  const len = os.cpus().length
  if (isProd()) {
    if (len > 4) {
      workerNums = Math.floor(len / 2) - 1
    } else {
      if (len > 2) {
        workerNums = len - 2
      } else {
        workerNums = 1
      }
    }
  }
  return workerNums
}

const firstToUpper = (str) => {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}

const fromatObjectData = (data) => {
  let obj = {}
  for (let key in data) {
    if (typeof data[key] !== undefined) {
      obj[key] = data[key]
    }
  }
  return obj
}
module.exports = {
  getWrokerNums,
  getHost,
  getLocalIP,
  resolve,
  currentTime,
  log,
  formatFetchUrl,
  errorInfo,
  getBufferSizeToMB,
  firstToUpper,
  fromatObjectData,
  bitToMB,
  isProd,
}
