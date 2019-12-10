var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl

Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    statusStr: ["审核中", "已通过", "未通过", "已失效", "已销假"],
    status: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let obj = wx.getMenuButtonBoundingClientRect();
    console.log(obj);
    this.setData({
      width: obj.left,
      height: obj.top + obj.height + 8,
      top: obj.top + (obj.height - 32) / 2
    }, () => {
      wx.getSystemInfo({
        success: (res) => {
          console.log(res.windowWidth);
          this.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            cleft: (res.windowWidth - 343) / 2
          })
        }
      })
    });
    console.log(this.data.windowWidth);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  back: function() {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var me = this;
    util.getMemberInfo(function(res) {
      console.log(res);
      me.setData({
        memberInfo: res
      })
      me.getHistory(res.openId, me.data.status);
    });

  },
  getHistory: function(openId, status) {
    var me = this;
    var sta = "";
    if (status == 0) {
      sta = "N";
    } else if (status == 1) {
      sta = "A";
    } else if (status == 2) {
      sta = "R";
    } else if (status == 3) {
      sta = "E";
    } else if (status == 4) {
      sta = "C";
    }
    util.postRequest("f/xb/leave/hisLeave", {
      openId: openId,
      status: sta
    }, function(res) {
      console.log(res.data);
      if (res.data.status == "success") {
        var list = res.data.data;
        me.setData({
          list
        })
      } else {
        me.setData({
          list: []
        })
        wx.showToast({
          icon: 'none',
          title: '暂无数据',
        })
      }
    })
  },
  changStatus: function(e) {
    var me = this;
    var index = e.currentTarget.dataset.index;
    me.setData({
      status: index
    })
    me.getHistory(me.data.memberInfo.openId, index);
  },
  look: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../look/look?id=' + id,
    })
  },
  xiaojia: function(e) {
    var me = this;
    var id = e.currentTarget.dataset.id;
    util.getRequest("f/xb/leave/cancelLeave", {
      leaveInfoId: id
    }, function(res) {
      console.log(res.data);
      if (res.data.status == "success") {
        wx.showToast({
          title: '处理成功',
        })
        me.setData({
          status: 1
        })
        me.getHistory(me.data.memberInfo.openId, 1);
      } else {
        wx.showToast({
          title: '操作失败',
        })
      }
    });
  },
  xiazai: function(e) {
    var id = e.currentTarget.dataset.id;
    var me = this;
    // util.getRequest("f/xb/leave/downloadLeave", {
    //   openId: me.data.memberInfo.openId,
    //   leaveInfoId: id
    // }, function(res) {
    //   console.log(res.data);
       var url = "";
    //   url = requestUrl + "f/xb/mer/toFindImg?imgUrl=" + res.data.data;
      //url = "http://192.168.31.224:8081/jeesite/userfiles/1/images/carousel/lan.png";
      url = "http://192.168.31.224:8081/jeesite/f/xb/leave/downloadLeave?openId=" + me.data.memberInfo.openId + "&leaveInfoId=" + id;
      console.log(url);
       wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            console.log(res.tempFilePath);
            var tempFilePath = res.tempFilePath;
            wx.saveFile({
              tempFilePath,
              success: function (res) {
                console.log(res);
                const savedFilePath = res.savedFilePath;
                // 打开文件
                wx.openDocument({
                  filePath: savedFilePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  },
                });
              },
              fail: function (err) {
                console.log('保存失败：', err)
              }
            });
           
          }
        }
      })
     
    // })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})