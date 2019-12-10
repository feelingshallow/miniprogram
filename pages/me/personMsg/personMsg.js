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
    ifEdit1: false,
    ifEdit2: false,
    sexList: ["女", "男"],
    sexIndex: 0,
    collegeList:[],
    collegeIndex: 0,
    majorList: [],
    majorIndex: 0,
    classList: [],
    classIndex: 0,
    mbShow:'none'
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
      me.setData({ memberInfo:res})
      me.initData(res);
    });
  },
  
  initData:function(res){
    console.log(res);
    var me = this;
    var college = "";
    var classs = "";
    var majorName = "";
    if (res.userType == "1") {
      me.setData({
        memberInfo: res,
        name: res.name,
        sex: res.sex,
        college: res.colleges.name,
        phone: res.phone,
        major: res.major
      })
      college = res.colleges.name;
      majorName = res.major;
    } else {
      me.setData({
        name: res.name,
        sex: res.sex,
        college: res.college.name,
        classs: res.classs.no,
        phone: res.phone,
        major: res.majorName,
        grade: res.grade
      })
      college = res.college.name;
      classs = res.classs.no;
      majorName = res.majorName;
    }
    if (res.sex) {
      for (var i = 0; i < me.data.sexList.length; i++) {
        if (res.sex == i) {
          me.setData({
            sexIndex: i
          })
        }
      }
    }
    if (college) {
      var collegeId = 0;
      util.getRequest("f/xb/mer/getColleges", {
      }, function (res) {
        console.log(res.data);
        var collegeList = res.data.data;
        me.setData({ collegeList })
        for (var i = 0; i < collegeList.length; i++) {
          if (college == collegeList[i].name) {
            me.setData({
              collegeIndex: i,
              collegeId: collegeList[i].id
            })
          }
        }
        console.log(majorName);
        if (majorName) {
          util.getRequest("f/xb/mer/getMajors", {
            collegeId: me.data.collegeId ? me.data.collegeId : ""
          }, function (res) {
            console.log(res.data);
            var majorList = res.data.data
            me.setData({
              majorList
            })
            var majorId = "";
            console.log(majorList);
            for (var i = 0; i < majorList.length; i++) {
              if (majorName == majorList[i].name) {
                majorId = majorList[i].id;
                me.setData({
                  majorIndex: i,
                  majorId
                })
                console.log(me.data.majorIndex);
              }
            }
          })
        } else {
          me.getMajor("");
        }
        if (classs) {
          util.getRequest("f/xb/mer/getClass", {
            collegeId: me.data.collegeId ? me.data.collegeId : ""
          }, function (res) {
            console.log(res.data);
            var classList = res.data.data
            me.setData({
              classList
            })
            var classId = "";
            for (var i = 0; i < classList.length; i++) {
              if (classs == classList[i].no) {
                classId = classList[i].id;
                me.setData({
                  classIndex: i,
                  classId
                })
                console.log(me.data.classIndex);
              }
            }
          })
        } else {
          me.getClass("");
        }
      })
    } else {
      me.getCollege();
    }
  },
  getCollege: function () {
    var me = this;
    util.getRequest("f/xb/mer/getColleges", {
    }, function (res) {
      console.log(res.data);
      var collegeList = res.data.data;
      var collegeId = "";
      for (var i = 0; i < collegeList.length; i++) {
        if (me.data.collegeIndex == i) {
          collegeId = collegeList[i].id
        }
      }
      me.setData({
        collegeList,
        collegeId
      })
    })
  },
  getMajor: function (collegeId) {
    var me = this;
    util.getRequest("f/xb/mer/getMajors", {
      collegeId: collegeId
    }, function (res) {
      console.log(res.data);
      var majorList = [];
      majorList = res.data.data;
      console.log(majorList[0].name);
      me.setData({
        majorList,
        majorIndex:0,
        majorId: majorList[0].id
      })
    })
  },
  getClass: function (collegeId) {
    var me = this;
    util.getRequest("f/xb/mer/getClass", {
      collegeId: collegeId
    }, function (res) {
      console.log(res.data);
      var classList = [];
      classList = res.data.data;
      console.log(classList);
      me.setData({
        classList,
        classIndex: 0
      })
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      collegeIndex: e.detail.value
    })
    var collegeList = this.data.collegeList;
    var collegeId = "";
    for (var i = 0; i < collegeList.length;i++){
      if (e.detail.value==i){
        collegeId = collegeList[i].id
      }
    }
    this.setData({ collegeId })
    console.log(collegeId);
    this.getMajor(collegeId);
  },
  bindPickerChange2: function (e) {
    this.setData({
      majorIndex: e.detail.value
    })
    var majorId = "";
    for (var i = 0; i < this.data.majorList.length; i++) {
      if (e.detail.value == i) {
        majorId = this.data.majorList[i].id
      }
    }
    this.setData({
      majorId
    })
    console.log(majorId);
  },
  bindPickerChange3: function (e) {
    this.setData({
      classIndex: e.detail.value
    })
    var classId = "";
    for (var i = 0; i < this.data.classList.length; i++) {
      if (e.detail.value == i) {
        classId = this.data.classList[i].id
      }
    }
    this.setData({
      classId
    })
    console.log(classId);
  },
  name: function(e) {
    var me = this;
    var name = e.detail.value;
    me.setData({
      name
    })
  },
  sex: function(e) {
    var me = this;
    var sex = e.detail.value;
    me.setData({
      sex
    })
  },
  // college: function(e) {
  //   var me = this;
  //   var college = e.detail.value;
  //   me.setData({
  //     college
  //   })
  // },
  classs: function(e) {
    var me = this;
    var classs = e.detail.value;
    me.setData({
      classs
    })
  },
  phone: function(e) {
    var me = this;
    var phone = e.detail.value;
    me.setData({
      phone
    })
  },
  // major: function(e) {
  //   var me = this;
  //   var major = e.detail.value;
  //   me.setData({
  //     major
  //   })
  // },
  grade: function(e) {
    var me = this;
    var grade = e.detail.value;
    me.setData({
      grade
    })
  },
  edit1: function() {
    var me = this;
    me.setData({
      ifEdit1: true,
    })
  },
  edit2: function () {
    var me = this;
    me.setData({
      ifEdit2: true,
    })
  },
  ok1: function() {
    var me = this;
    me.setData({mbShow:''})
    wx.showLoading({});
    var name = me.data.name;
    var grade = me.data.grade;
    var phone = me.data.phone;
    if (!name){
      wx.showToast({
        icon:'none',
        title: '请输入姓名',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!grade) {
      wx.showToast({
        icon: 'none',
        title: '请输入年级',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!phone) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系方式',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    console.log(me.data.majorId);
    util.postRequest("f/xb/mer/modifyStuMess", {
      openId: me.data.memberInfo.openId,
      name:me.data.name,
      sex: me.data.sexIndex,
      collegeId: me.data.collegeId,
      grade: me.data.grade,
      major: me.data.majorId,
      classId: me.data.classId,
      phone:me.data.phone
    }, function(res) {
      console.log(res.data);
      wx.showToast({
        title: '修改成功',
      })
      me.setData({ mbShow: 'none' })
      var memberInfo = res.data.data;
      wx.setStorage({
        key: 'memberInfo',
        data: memberInfo,
      })
      me.setData({
        ifEdit1: false
      })
      me.initData(memberInfo);
    })
  },
  ok2: function () {
    var me = this;
    me.setData({ mbShow: '' })
    wx.showLoading({});
    var name = me.data.name;
    var phone = me.data.phone;
    if (!name) {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
   
    if (!phone) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系方式',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone))) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    console.log(me.data.majorId);
    util.postRequest("f/xb/mer/modifyTeaMess", {
      openId: me.data.memberInfo.openId,
      name: me.data.name,
      sex: me.data.sexIndex,
      college: me.data.collegeId,
      major: me.data.majorId,
      phone: me.data.phone
    }, function (res) {
      console.log(res.data);
      me.setData({ mbShow: 'none' })
      wx.showToast({
        title: '修改成功',
      })
      var memberInfo = res.data.data;
      wx.setStorage({
        key: 'memberInfo',
        data: memberInfo,
      })
      me.setData({
        ifEdit2: false
      })
      me.initData(memberInfo);
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