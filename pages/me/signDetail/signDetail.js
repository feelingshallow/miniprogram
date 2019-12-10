var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.imgUrl

Page({
  /**
  * 页面的初始数据
  */
  data: {
    requestUrl: requestUrl,
    imgUrl: imgUrl,
    imgUrl2: 'f/xb/mer/toFindImg?imgUrl=',
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({id})
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
    console.log(this.data.windowWidth);
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
    var me = this;
    util.getMemberInfo(function (res) {
      console.log(res);
      me.setData({
        memberInfo: res
      })
     
    })

  },

  getDetail: function (id) {
    console.log(id);
    id ='dba67f308452491881a9fdf58b7c4c43';
    var me = this;
    util.getRequest("f/xb/signin/signJnlDetail", {
      id: id
    }, function (res) {
      console.log(res.data);
      var entity = res.data.data;
      me.setData({
        entity,
        dataSize:res.data.dataSize,
        list0:res.data.list0,
        list1:res.data.list1
      })
    })
  },

  back: function () {
    wx.navigateBack({})
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