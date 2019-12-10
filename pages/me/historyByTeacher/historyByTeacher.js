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
      me.getHistory(res.id, me.data.status);
    });

  },
  getHistory: function(id, status) {
    var me = this;
    var sta = "";
    if (status == 0) {//审核中
      sta = "N";
    } else if (status == 1) {//已通过
      sta = "A";
    } else if (status == 2) {//未通过
      sta = "R";
    } else if (status == 3) {//已失效
      sta = "E";
    } else if (status == 4) {//已销假
      sta = "C";
    }
    util.postRequest("f/xb/leave/techApprLeaveRecord", {
      apprId: id,
      apprStatus: sta
    }, function(res) {
      console.log(res.data);
      if (res.data.status == "success") {
        var list = res.data.data;
        me.setData({
          list
        })
        console.log(me.data.list);
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
    me.getHistory(me.data.memberInfo.id, index);
  },
  liyou:function(e){
    var me = this;
    var liyou = e.detail.value;
    me.setData({liyou})
  },
  caozuo: function(e) {
    var me = this;
    var id = e.currentTarget.dataset.id;
    var flag = e.currentTarget.dataset.flag;
    var apprStatus = "";
    var liyou = me.data.liyou;
    if(flag==0){//驳回
      apprStatus = "R";
      if (!liyou) {
        wx.showToast({
          title: '请输入理由',
        })
        return;
      }
    } else {
      apprStatus = "A";
    }
    util.postRequest("f/xb/leave/apprLeave", {
      apprId: me.data.memberInfo.id,
      leaveInfoId:id,
      apprStatus: apprStatus,
      apprReason: liyou
    }, function(res) {
      console.log(res.data);
      if (res.data.status == "success") {
        wx.showToast({
          title: '处理成功',
        })
        me.setData({
          status: 0
        })
        setTimeout(function () {
          me.getHistory(me.data.memberInfo.id, 0);
        },500);
      } else {
        wx.showToast({
          title: '操作失败',
        })
      }
    });
  },
ljgt:function(e){
  var phone = e.currentTarget.dataset.phone;
  console.log(phone);
  wx.makePhoneCall({
    phoneNumber: phone
  })
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