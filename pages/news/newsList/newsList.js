var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.imgUrl
var currentPage = 1,
  limit = 5;
Page({
  /**
  * 页面的初始数据
  */
  data: {
    imgUrl: imgUrl,
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
            cleft: (res.windowWidth - 343) / 2
          })
        }
      })
    });
    this.getList();
  },

  getList: function () {
    var me = this;
    util.postRequest("f/xb/article/list", {
      pageNo: currentPage,
      pageSize: limit
    }, function (res) {
      console.log(res.data);
      wx.stopPullDownRefresh()
      wx.hideLoading();
      if (res.data.status == "success"){
        var list = res.data.data;
        if (currentPage == 1) {
          me.setData({
            list: list
          })
        } else {
          me.setData({
            list: me.data.list.concat(list)
          })
        }
      }else{

      }
    })
  },

  toDetail: function (e) {
    var me = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../newsDetail/newsDetail?id=' + id,
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

back:function(){
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
    var me = this;
    wx.showLoading({
      title: '',
    })
    currentPage++;
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})