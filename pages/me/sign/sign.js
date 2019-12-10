var util = require('../../../utils/util');
var dateTimePicker = require('../../../utils/dateTimePicker.js');
var app = getApp()
var requestUrl = app.globalData.requestUrl

const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []

const years1 = []
const months1 = []
const days1 = []
const hours1 = []
const minutes1 = []

var thisYear = date.getFullYear();
var thisMon = date.getMonth();
var thisDay = date.getDate();
var thisHours = date.getHours();
var thisMinutes = date.getMinutes();
thisYear = thisYear + "";
var nowYear = thisYear.slice(2, 4);
var nowMonth = date.getMonth();
for (let i = nowYear - 0; i <= nowYear - 0 + 5; i++) {
  years.push(i)
  years1.push(i)
}

for (let i = date.getMonth(); i <= 11; i++) {
  var k = i;
  // if (0 <= i && i < 9) {
  //   k = "0" + (i + 1);
  // } else {
  k = (i + 1);
  // }
  months.push(k)
  months1.push(k)
}
console.log(months)
// if (0 <= thisMon && thisMon < 9) {
//   thisMon = "0" + (thisMon + 1);
// } else {
thisMon = (thisMon + 1);
// }
console.log(thisMon);
console.log(thisDay);
// if (0 <= thisDay && thisDay < 10) {
//   thisDay = "0" + thisDay;
// }
console.log(thisDay);
var totalDay = mGetDate(date.getFullYear(), thisMon);
for (let i = thisDay; i <= 31; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    // k = "0" + i
  }
  days.push(k)
  days1.push(k)
}
console.log(days);
for (let i = 0; i <= 23; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    // k = "0" + i
  }
  hours.push(k)
  hours1.push(k)
}
for (let i = 0; i <= 59; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    // k = "0" + i
  }
  minutes.push(k)
  minutes1.push(k)
}

function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkTime: date.getFullYear() + "-" + thisMon + "-" + thisDay + " " + thisHours + ":" + thisMinutes,
    //---时间控件参数
    flag: true,
    years: years,
    years1: years1,
    lastYears: years[0],
    lastYears1: years1[0],
    year: date.getFullYear(),
    year1: date.getFullYear(),
    months: months,
    months1: months1,
    lastMonths: months[0],
    lastMonths1: months1[0],
    month: thisMon,
    month1: thisMon,
    days: days,
    days1: days1,
    lastDay: days[0],
    lastDay1: days1[0],
    day: thisDay,
    day1: thisDay,
    //value: [1, thisMon - 1, thisDay - 1, 0, 0],
    value: [0, 0],
    value1: [0, 0],
    hours: hours,
    hours1: hours1,
    hour: thisHours,
    hour1: thisHours,
    minutes: minutes,
    minutes1: minutes,
    minute: thisMinutes,
    minute1: thisMinutes,
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    flag: true,
    qingjiaType: ["病假", "事假", "产假", "婚假", "丧假", "其他"],
    qingjiaIndex: 0,
    qingjia: '病假',
    region: ['山西省', '太原市', '万柏林区'],
    img1: '../../../images/zhanwei1.png',
    img2: '../../../images/zhanwei1.png',
    imgList: [],
    successshow: 'none',
    failShow: 'none',
    mbShow: 'none',
    lastValue: [0, 0],
    lastValue1: [0, 0],
    school: ["中北大学"],
    schoolIndex: 0,
    lou: [],
    louIndex: 0,
    room: [],
    roomIndex: 0
  },

  showModel: function(e) {
    this.setData({
      flag: false
    });
  },
  getTime: function(e) {
    var times = this.data.year + "-" + this.data.month + "-" + this.data.day + " " + this.data.hour + ":" + this.data.minute
    this.setData({
      flag: true,
      checkTime: times
    });
  },
  bindChange: function(e) {
    var me = this;
    var val = e.detail.value
    console.log(val);
    if (val[0] != me.data.lastValue[0]) { //改变了时
      this.setData({
        value: [val[0], val[1]]
      })
    } else if (val[1] != me.data.lastValue[1]) { //改变了分
      this.setData({
        value: [val[0], val[1]]
      })
    }
    console.log("起始时间：" + this.data.hours[this.data.value[0]] + "时" + this.data.minutes[this.data.value[1]] + "分");
    this.setData({
      beginTime: this.data.hours[this.data.value[0]] + ':' + this.data.minutes[this.data.value[1]]
    })
    me.setData({
      lastValue: val
    })

  },

  bindChange1: function(e) {
    var me = this;
    var val = e.detail.value
    console.log(val);
    if (val[0] != me.data.lastValue1[0]) { //改变了时
      this.setData({
        value1: [val[0], val[1]]
      })
    } else if (val[1] != me.data.lastValue1[1]) { //改变了分
      this.setData({
        value1: [val[0], val[1]]
      })
    }
    console.log("结束时间：" + this.data.hours1[this.data.value1[0]] + "时" + this.data.minutes1[this.data.value1[1]] + "分");
    this.setData({
      endTime: this.data.hours1[this.data.value1[0]] + ':' + this.data.minutes1[this.data.value1[1]]
    })
    me.setData({
      lastValue1: val
    })

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
    wx.getSystemInfo({
      success: (res) => {
        var loginTop = (res.windowHeight - res.windowHeight * 0.8) / 2 + 60;
        console.log(loginTop);
        var tishiHeight = (res.windowHeight * 0.6);
        this.setData({
          loginTop,
          tishiHeight
        })
      }
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
      me.getMsg();
      me.initData();
    });
  },
  getMsg: function() {
    var me = this;
    util.getRequest("f/xb/signin/getSignMess", {
      openId: me.data.memberInfo.openId,
    }, function(res) {
      console.log(res.data);
      me.setData({
        entity: res.data
      })
    });
  },
  initData: function() {
    var me = this;
    me.setData({
      school: ["中北大学"],
      schoolIndex: 0
    })
    me.getLou();
  },
  getLou: function() {
    var me = this;
    util.getRequest("f/xb/signin/getAb", {}, function(res) {
      console.log(res.data);
      var lou = [];
      lou = res.data.data;
      me.setData({
        lou
      })
      me.getRoom(lou[0].id);
    });
  },
  getRoom: function(id) {
    var me = this;
    util.getRequest("f/xb/signin/getClassroom", {
      abNo: id
    }, function(res) {
      console.log(res.data);
      var room = [];
      room = res.data.data;
      me.setData({
        room
      })
    });
  },
  bindRegionChange1: function(e) {
    console.log(e);
    var index = e.detail.value;
    this.setData({
      schoolIndex: index
    })
  },
  bindRegionChange2: function(e) {
    var me = this;
    console.log(e);
    var index = e.detail.value;
    this.setData({
      louIndex: index
    })
    var id = me.data.lou[index].id;
    me.getRoom(id);
  },
  bindRegionChange3: function(e) {
    console.log(e);
    var index = e.detail.value;
    this.setData({
      roomIndex: index
    })
  },

  back: function() {
    wx.navigateBack({})
  },

  tijiao: function() {
    var me = this;
    me.setData({mbShow:''})
    wx.showLoading({})
    var beginTime = me.data.beginTime;
    var endTime = me.data.endTime;
    if (!beginTime) {
      beginTime = me.data.hours[me.data.value[0]] + ":" + me.data.minutes[me.data.value[1]];
    }
    if (!endTime) {
      endTime = me.data.hours1[me.data.value1[0]] + ":" + me.data.minutes1[me.data.value1[1]];
    }
    console.log(beginTime);
    console.log(endTime);
    if (me.data.hours[me.data.value[0]] - 0 > me.data.hours1[me.data.value1[0]] - 0) {
      //开始年份大于结束年份
      console.log("时间不对");
      wx.showToast({
        icon: 'none',
        title: '签到时间不正确',
      })
      me.setData({ mbShow: 'none' })
      return;
    } else if (me.data.hours[me.data.value[0]] - 0 == me.data.hours1[me.data.value1[0]] - 0) {
      //开始年份等于结束年份
      if (me.data.minutes[me.data.value[1]] - 0 >= me.data.minutes1[me.data.value1[1]] - 0) {
        console.log("时间不对");
        wx.showToast({
          icon: 'none',
          title: '签到时间不正确',
        })
        me.setData({ mbShow: 'none' })
        return;
      }
    } else if (me.data.hours[me.data.value[0]] - 0 < me.data.hours1[me.data.value1[0]] - 0) {
      //开始年份小于结束年份
      if (me.data.minutes[me.data.value[1]] - 0 >= me.data.minutes1[me.data.value1[1]] - 0) {
        console.log("时间不对");
        wx.showToast({
          icon: 'none',
          title: '签到时间不正确',
        })
        me.setData({ mbShow: 'none' })
        return;
      } 
    }
    if (!me.data.room[me.data.roomIndex]) {
      wx.showToast({
        icon: 'none',
        title: '请选择教室',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    util.getRequest("f/xb/signin/createSign", {
      startTime: beginTime,
      endTime: endTime,
      buildName:me.data.lou[me.data.louIndex].id,
      classRoom:me.data.room[me.data.roomIndex].id,
      openId: me.data.memberInfo.openId
    }, function (res) {
      console.log(res.data);
      me.setData({ mbShow: 'none' })
      if (res.data.status == "success") {
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../signDjs/signDjs',
          })
        },500);
      }else{
        wx.showToast({
          icon:'none',
          title: '操作失败',
        })
      }
    });
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