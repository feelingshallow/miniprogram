var util = require('../../../utils/util');
var WxParse = require('../../../wxParse/wxParse.js')
var app = getApp()
var requestUrl = app.globalData.requestUrl

Page({
  /**
  * 页面的初始数据
  */
  data: {
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id ? options.id : 0;
    this.setData({id});
    this.getDetail(id);
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

  getDetail: function (id) {
    var me = this;
    util.postRequest("f/xb/article/details", {
      id: id,
    }, function (res) {
      console.log(res.data);
      var details = res.data.data;
      me.setData({
        details
      })
      WxParse.wxParse('detail', 'html', res.data.data.content, me, 5);
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  back: function () {
    wx.navigateBack({})
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})