const FormData = require('form-data')
const { uploadFile } = require('../service/base-qianhai')
const { getBufferSizeToMB } = require('../utils')

/**
 * 上传
 */
exports.upload = async ({ pdfBuffer, token, id, uid, originUrl }) => {
  log({
    type: 'info',
    msg: `upload  params id: ${id}, token: ${token}, uid: ${uid}, originUrl: ${originUrl}`,
  })
  log({
    type: 'info',
    msg: '文件大小：' + getBufferSizeToMB(pdfBuffer) + 'MB',
    uid,
  })
  const formData = new FormData()
  formData.append('file', pdfBuffer, 'xxx.pdf')
  formData.append('id', id)
  log({ type: 'error', msg: '上传文件接口启动', uid })
  try {
    const uploadPath =
      '/marketing-product/admin/api/v1/report/structure/upload/pdf/file'
    const uploadRes = await uploadFile(originUrl, formData, token, uploadPath, {
      ...formData.getHeaders(),
    })
    log({
      type: 'info',
      msg: '上传文件接口响应' + JSON.stringify(uploadRes.data),
      uid,
    })
  } catch (err) {
    log({ type: 'error', msg: '上传文件接口响应' + JSON.stringify(err), uid })
  }
}
