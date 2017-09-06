function sendRequest(path,method,data,callback) {
  wx.request({
    url: 'https://nuanwan.wekeji.cn/student/index.php/'+path,
    data: data,
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: callback
  })
}

module.exports = {
  sendRequest: sendRequest
}
