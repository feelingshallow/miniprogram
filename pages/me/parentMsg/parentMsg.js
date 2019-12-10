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
    edit1: '',
    ok1: 'none',
    edit2: '',
    ok2: 'none',
    mbShow: 'none',
    editFlag1: false,
    editFlag2: false
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
      me.getParentMsg(res.openId, res.id);
    });

  },
  getParentMsg: function(openId, no) {
    var me = this;
    util.postRequest("f/xb/mer/guardianMess", {
      openId: openId,
      no: no
    }, function(res) {
      console.log(res.data);
      var data1 = res.data.data1;
      var data2 = res.data.data2;
      var name1 = data1.name;
      var sex1 = data1.sex;
      var relationship1 = data1.relationship;
      var job1 = data1.job;
      var phone1 = data1.phone;
      var name2 = data2.name;
      var sex2 = data2.sex;
      var relationship2 = data2.relationship;
      var job2 = data2.job;
      var phone2 = data2.phone;
      me.setData({
        data1,
        name1: name1 ? name1 : '',
        sex1: sex1 ? sex1 : '',
        relationship1: relationship1 ? relationship1 : '',
        job1: job1 ? job1 : '',
        phone1: phone1 ? phone1 : '',
        data2,
        name2: name2 ? name2 : '',
        sex2: sex2 ? sex2 : '',
        relationship2: relationship2 ? relationship2 : '',
        job2: job2 ? job2 : '',
        phone2: phone2 ? phone2 : ''
      })
    })
  },
  edit1: function() {
    var me = this;
    me.setData({
      editFlag1: true
    })
  },
  edit2: function() {
    var me = this;
    me.setData({
      editFlag2: true
    })
  },
  name1: function(e) {
    var me = this;
    var name1 = e.detail.value;
    me.setData({
      name1
    })
  },
  sex1: function(e) {
    var me = this;
    var sex1 = e.detail.value;
    me.setData({
      sex1
    })
  },
  relationship1: function(e) {
    var me = this;
    var relationship1 = e.detail.value;
    me.setData({
      relationship1
    })
  },
  job1: function(e) {
    var me = this;
    var job1 = e.detail.value;
    me.setData({
      job1
    })
  },
  phone1: function(e) {
    var me = this;
    var phone1 = e.detail.value;
    me.setData({
      phone1
    })
  },
  name2: function(e) {
    var me = this;
    var name2 = e.detail.value;
    me.setData({
      name2
    })
  },
  sex2: function(e) {
    var me = this;
    var sex2 = e.detail.value;
    me.setData({
      sex2
    })
  },
  relationship2: function(e) {
    var me = this;
    var relationship2 = e.detail.value;
    me.setData({
      relationship2
    })
  },
  job2: function(e) {
    var me = this;
    var job2 = e.detail.value;
    me.setData({
      job2
    })
  },
  phone2: function(e) {
    var me = this;
    var phone2 = e.detail.value;
    me.setData({
      phone2
    })
  },
  ok1: function(e) {
    var me = this;
    me.setData({
      mbShow: ''
    })
    wx.showLoading({});
    var id = e.currentTarget.dataset.id;
    var phone = me.data.phone1;
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      me.setData({
        mbShow: 'none'
      })
      return;
    }
    util.postRequest("f/xb/mer/modifyGuardianMess", {
      id: id,
      name: me.data.name1 ? me.data.name1 : me.data.data1.name,
      sex: me.data.sex1 ? me.data.sex1 : me.data.data1.sex,
      relationship: me.data.relationship1 ? me.data.relationship1 : me.data.data1.relationship,
      job: me.data.job1 ? me.data.job1 : me.data.data1.job,
      phone: me.data.phone1 ? me.data.phone1 : me.data.data1.phone
    }, function(res) {
      console.log(res.data);
      me.setData({
        mbShow: 'none'
      })
      me.setData({
        editFlag1: false
      })
      wx.showToast({
        title: '修改成功',
      })
      me.getParentMsg(me.data.memberInfo.openId, me.data.memberInfo.id);
    })
  },
  ok2: function(e) {
    var me = this;
    me.setData({
      mbShow: ''
    })
    wx.showLoading({});
    var id = e.currentTarget.dataset.id;
    var phone = me.data.phone2;
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      me.setData({
        mbShow: 'none'
      })
      return;
    }
    util.postRequest("f/xb/mer/modifyGuardianMess", {
      id: id,
      name: me.data.name2 ? me.data.name2 : me.data.data2.name,
      sex: me.data.sex2 ? me.data.sex2 : me.data.data2.sex,
      relationship: me.data.relationship2 ? me.data.relationship2 : me.data.data2.relationship,
      job: me.data.job2 ? me.data.job2 : me.data.data2.job,
      phone: me.data.phone2 ? me.data.phone2 : me.data.data2.phone
    }, function(res) {
      console.log(res.data);
      me.setData({
        mbShow: 'none'
      })
      me.setData({
        editFlag2: false
      })
      wx.showToast({
        title: '修改成功',
      })
      me.getParentMsg(me.data.memberInfo.openId, me.data.memberInfo.id);
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