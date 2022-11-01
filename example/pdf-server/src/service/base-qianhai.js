const { default: axios } = require('axios')

exports.uploadFile = (originUrl, data, token, uploadPath, _headers = {}) => {
  console.log(
    '入参：',
    JSON.stringify(
      {
        originUrl,
        // data,
        token,
        _headers,
      },
      null,
      2,
    ),
  )
  return axios({
    url: `${originUrl}${uploadPath}`,
    method: 'POST',
    data: data,
    headers: {
      ..._headers,
      token,
    },
    maxBodyLength: Infinity,
  })
}

exports.reportReason = ({ originUrl, data, token }) => {
  console.log(
    'reportReason 入参：',
    JSON.stringify(
      {
        originUrl,
        token,
        data,
      },
      null,
      2,
    ),
  )
  return axios({
    url: `${originUrl}/marketing-product/admin/api/v1/report/structure/pdf/fail`,
    // url: `http://richgo.chtfundtest.com/aap/api/v1/blackcat/remake/send/report`,
    method: 'POST',
    data,
    headers: {
      token,
    },
  })
}
