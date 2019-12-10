var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl

Page({
  /**
  * 页面的初始数据
  */
  data: {
    tishishow: 'none',
    loginTop: '100',
    mbShow: 'none',
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            cleft: (res.windowWidth-343)/2
          })
        }
      })
    });

    wx.getSystemInfo({
      success: (res) => {
        var loginTop = (res.windowHeight - res.windowHeight * 0.8) / 2;
        console.log(loginTop);
        var tishiHeight = (res.windowHeight * 0.6);
        this.setData({
          loginTop,
          tishiHeight
        })
      }
    })
    console.log(this.data.windowWidth);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  back: function () {
    wx.navigateBack({})
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