var util = require('../../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.imgUrl

Page({
  /**
  * 页面的初始数据
  */
  data: {
    imgUrl: imgUrl,
    requestUrl: requestUrl,
    yulanImg:'../../../images/uploadImg.png',
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    list: [{ text: ["什么什么什么理论课1",] }, { text: ["什么什么什么理论课3", "什么什么什么理论课4"] }, { text: ["什么什么什么理论课1", "什么什么什么理论课2", "什么什么什么理论课2", "什么什么什么理论课2", "什么什么什么理论课2"] }, { text: ["什么什么什么理论课1", "什么什么什么理论课2"] }, { text: ["什么什么什么理论课1", "什么什么什么理论课2"] }],
    mbShow:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            cleft: (res.windowWidth-343)/2
          })
        }
      })
    });
    console.log(this.data.windowWidth);
    var me = this;
    util.getMemberInfo(function (res) {
      console.log(res);
      me.setData({
        memberInfo: res
      })
      var yulanImg = "";
      if (res.inchImg) {
        yulanImg = "f/xb/mer/toFindImg?imgUrl=" + res.inchImg;
        console.log(requestUrl + yulanImg);
        me.setData({ yulanImg: requestUrl + yulanImg })
      }
    });
  },

uploadImg:function(){
  var me =this;
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success(res) {
      console.log(res);
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      me.setData({ 
        yulanImg:tempFilePaths,
        tempFilePaths: tempFilePaths
         })
      console.log(tempFilePaths);
    }
  })
},


  ok: function () {
    var me = this;
    console.log(me.data.tempFilePaths);
    me.setData({ mbShow: '' })
    if (!me.data.tempFilePaths){
      wx.showToast({
        icon:'none',
        title: '请选择图片',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: requestUrl + '/f/xb/mer/upLoadImg',
      filePath: me.data.yulanImg[0],
      name: 'file',
      formData: {
        openId: me.data.memberInfo.openId
      },
      complete: function (res) {
        console.log(res);
        var data = JSON.parse(res.data)
        console.log(data);
        wx.hideLoading();
        me.setData({ mbShow: 'none' })
        if(data.status=='success'){
            wx.showToast({
              title: '上传成功',
            })
        } else {
          wx.showToast({
            icon:'none',
            title: '系统繁忙',
          })
        }
      }
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
  back: function () {
    wx.navigateBack({})
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