const { default: axios } = require('axios')

exports.uploadFile = (originUrl, data, token, _headers = {}) => {
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
    url: `${originUrl}/aap/api/v1/blackcat/storage/file/upload`,
    // url: `http://richgo.chtfundtest.com/aap/api/v1/blackcat/storage/file/upload`,
    method: 'POST',
    data: data,
    headers: {
      ..._headers,
      tenantId: '1001',
      Authorization: 'bearer ' + token,
    },
    maxBodyLength: Infinity,
  })
}

exports.schareFile = (originUrl, data, token) => {
  console.log(data, 'data')
  return axios({
    url: `${originUrl}/aap/api/v1/blackcat/remake/send/report`,
    // url: `http://richgo.chtfundtest.com/aap/api/v1/blackcat/remake/send/report`,
    method: 'POST',
    data,
    headers: {
      tenantId: '1001',
      Authorization: 'bearer ' + token,
    },
  })
}
