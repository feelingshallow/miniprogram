var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.requestUrl

Page({
  /**
  * 页面的初始数据
  */
  data: {
    imgUrl: imgUrl,
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    userType:0
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
    console.log(this.data.windowWidth);
  },
  back: function () {
    wx.navigateBack({})
  },
  myMsg:function(){
    wx.navigateTo({
      url: '../personMsg/personMsg',
    })
  },
  jhr: function () {
    wx.navigateTo({
      url: '../parentMsg/parentMsg',
    })
  },
  upload: function () {
    wx.navigateTo({
      url: '../upload/upload',
    })
  },
  history: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  history2: function () {
    wx.navigateTo({
      url: '../historyByTeacher/historyByTeacher',
    })
  },
  xxjl: function () {
    wx.navigateTo({
      url: '../msgCenter/msgCenter',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },

  msgCenter: function () {
    wx.navigateTo({
      url: '../msgCenter/msgCenter',
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
    var me =this;
    util.getMemberInfo(function (res) {
      console.log(res);
      me.setData({
        memberInfo: res
      })
      //me.getMyMsg(res);
    });
  },

  getMyMsg: function (openId) {
    var me = this;
    util.postRequest("f/xb/index", {
      openId: openId,
    }, function (res) {
      console.log(res.data);
      var detail = res.data;
      var bannerlist = [];
      for (var i = 0; i < detail.imgs.length; i++) {
        bannerlist = bannerlist.concat(detail.imgs[i].imgPath);
      }
      var kbshow = 'none';
      if (detail.course != 1) {
        me.setData({
          kbshow: ''
        })
      }
      var article = detail.article;
      me.setData({
        bannerlist,
        article
      })
    })
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