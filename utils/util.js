var app = getApp()
var requestUrl = app.globalData.requestUrl
var appId = app.globalData.appId

/**
 * 格式化时间
 */
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}

function formatTimeStr(date) {
  date = new Date(date);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return month + '.' + day
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D;
}

function timestampToTimeAll(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + ' ' + h + m + s;
}

function timestampToTime2(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes()
  return Y + M + D + ' ' + h + m;
}

/**
 * 格式化数字  一位数前加0
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 判断用户登录状态并登录
 */
function getMemberInfo(fn) {
  var userInfo = {}
  wx.getStorage({
    key: 'memberInfo',
    complete: function (res) {
      if (res.data && res.data.memberInfo && res.data.memberInfo.openId && "undefined" != res.data.memberInfo.openId) {
        if (fn) {
          fn(res.data.memberInfo);
        }
      } else {
        wx.login({
          success: function (res) {
            var code = res.code;
            console.log(code);
            wx.request({
              url: requestUrl + '/f/xb/getUser',
              data: {
                code: code
              },
              success: function (res) {
                console.log(res);
                if (res.data.status == 'success') {
                  var memberInfo = res.data.data;
                  wx.setStorage({
                    key: 'memberInfo',
                    data: memberInfo,
                  })
                  if (fn) {
                    fn(res.data.data);
                  }
                } else {
                  wx.showToast({
                    title: res.data.data.message,
                    icon: "loading"
                  })
                }
              }
            })
          }
        })
      }
    },
  })
}

//上传图片
function uploadImg(i, imageList, imgUrls, folderName, fn) {
  if (imageList.length == 0){
    fn("");
    return;
  }
  if (imageList[i].indexOf("/static") > -1) {
    if (i == 0) {
      imgUrls = imageList[i]
    } else {
      imgUrls += "," + imageList[i]
    }
    i++
    if (i == imageList.length) {
      fn(imgUrls);
    } else {
      uploadImg(i, imageList, imgUrls, folderName, fn);
    }
  } else {
    wx.uploadFile({
      url: 'https://wxapi.eeasyhome.com/public/api/wxapp/Forum/one',
      filePath: imageList[i],
      name: 'file',
      formData: {
        folderName
      },
      complete: function (res) {
        var data = JSON.parse("[" + res.data + "]");
        if (i == 0) {
          imgUrls = data[0].data.url
        } else {
          imgUrls += "," + data[0].data.url
        }
        i++
        if (i == imageList.length) {
          fn(imgUrls);
        } else {
          uploadImg(i, imageList, imgUrls, folderName, fn);
        }
      }
    })
  }
}
/**
 * 获取定位地址
 */
function getRelationList(fn) {
  wx.request({
    url: requestUrl + 'program/WxParam/getRelationList',
    data: { appId: appId },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    success: function (res) {
      fn(res.data.data);
    }
  })
}


function getRequest(url, data, fn) {
  wx.request({
    url: requestUrl + url,
    data: data,
    complete: function (res) {
      if (fn) { fn(res) }
    }
  })
}

function postRequest(url, data, fn) {
  wx.request({
    url: requestUrl + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    method: 'POST',
    complete: function (res) {
      if (fn) { fn(res) }
    }
  })
}

function loginPostRequest(url, data, fn) {
  wx.request({
    url: 'https://wxapi.eeasyhome.com/' + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    method: 'POST',
    complete: function (res) {
      if (fn) { fn(res) }
    }
  })
}

/**
 * 存储formid
 */
function getFormId(formId) {
  if (formId && formId != "the formId is a mock one") {
    wx.getStorage({
      key: 'memberInfo',
      success: function (res) {
        console.log(res);
        var user_id = res.data.userId;
        console.log(user_id);
        if (user_id) {
          wx.request({
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            url: requestUrl + "public/index/xcx/xcx_jiemi",
            data: {
              user_id: user_id,
              url: 'formid_add_post',
              form_id: formId
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
            }
          })
        } else {
          console.log("数据不全");
        }
      },
    })
  } else {
    console.log("数据不全");
  }
}

module.exports = {
  formatTime: formatTime,
  getRequest: getRequest,
  postRequest: postRequest,
  getMemberInfo: getMemberInfo,
  loginPostRequest: loginPostRequest,
  formatDate: formatDate,
  uploadImg: uploadImg,
  formatTimeStr: formatTimeStr,
  timestampToTime: timestampToTime,
  timestampToTime2: timestampToTime2,
  timestampToTimeAll: timestampToTimeAll,
  getFormId: getFormId
}
