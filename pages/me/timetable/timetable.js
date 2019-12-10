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
    list: [{
      text: ["什么什么什么理论课1理论课理论课理论课课理论课课理论课课理论课课理论课课理论课", "", "什么什么什么理论课1", "", ""]
    }, {
      text: ["什么什么什么理论课3", "什么什么什么理论课4", "", "", ""]
    }, {
      text: ["什么什么什么理论课1", "什么什么什么理论课2", "什么什么什么理论课2", "什么什么什么理论课2", "什么什么什么理论课2"]
    }, {
      text: ["什么什么什么理论课1", "什么什么什么理论课2", "", "", ""]
    }, {
      text: ["什么什么什么理论课1", "", "", "", "什么什么什么理论课2"]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.list);
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var me = this;
    me.getDetail();
  },

  getDetail: function() {
    var me = this;
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        console.log(res);
        var openId = res.data.openId;
        util.getRequest("f/xb/courseMore", {
          openId: openId,
        }, function(res) {
          console.log(res.data);
          var detail = res.data;
          me.setData({
            detail
          })
        })
      },
    })
  },

  toDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../course/course?id=' + id,
    })
  },
  back: function() {
    wx.navigateBack({})
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