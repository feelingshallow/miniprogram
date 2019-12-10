var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.imgUrl
var timer = null;
var timer1 = null;
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
    fen: 0,
    miao: 0,
    flag: 0
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
      me.getDjs();
      me.getList();
      clearInterval(timer1);
      var timer1 = setInterval(function() {
        me.getList();
      }, 3000);
    });
  },
  getDjs: function() {
    var me = this;
    util.getRequest("f/xb/signin/getSignTime", {
      openId: me.data.memberInfo.openId
    }, function(res) {
      console.log(res.data);
      if (res.data.status == 'success') {
        clearInterval(timer);
        var times = res.data.data / 1000;
        var timer = setInterval(function() {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值        
          if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          if (times > 0) {
            times--;
            me.setData({
              fen: minute,
              miao: second
            })
          }
          if (times == 0) {
            times = 0;
            me.setData({
              fen: 0,
              miao: 0,
              flag: 1
            })
            clearInterval(timer);
            wx.showToast({
              title: '签到已结束',
            })
          }
        }, 1000);
      } else {
        wx.showToast({
          icon: 'none',
          title: '倒计时已结束',
        })
      }
    })
  },
  getList: function() {
    var me = this;
    util.getRequest("f/xb/signin/getSignList", {
      openId: me.data.memberInfo.openId
    }, function(res) {
      console.log(res.data);
      var list0 = res.data.list0;
      var list1 = res.data.list1;
      var dataSize = res.data.dataSize;
      me.setData({
        list0,
        list1,
        dataSize
      })
    })
  },
  jieshu: function() {
    var me = this;
    util.getRequest("f/xb/signin/finishSign", {
      openId: me.data.memberInfo.openId
    }, function(res) {
      console.log(res.data);
      if(res.data.status=='success'){
        clearInterval(timer);
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '../record/record',
          })
        },500);
      }
    })
  },


  toIndex: function() {
    wx.navigateTo({
      url: '../../index/index',
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

  onUnload: function() {
    clearInterval(timer);
    clearInterval(timer1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})