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
var nj = [];
thisYear = thisYear + "";
var nowYear = thisYear.slice(2, 4);
var nowMonth = date.getMonth();
for (let i = nowYear - 0; i <= nowYear - 0 + 5; i++) {
  years.push(i)
  years1.push(i)
}
for (let i = nowYear - 3; i <= nowYear; i++) {
  nj.push(i)
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
    value: [0, 0, 0, 0],
    value1: [0, 0, 0, 0],
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
    img3: '../../../images/zhanwei1.png',
    imgList: [],
    successshow: 'none',
    failShow: 'none',
    mbShow: 'none',
    lastValue: [0, 0, 0, 0],
    lastValue1: [0, 0, 0, 0],
    sexList: ["女", "男"],
    sexIndex: 0,
    njList:nj,
    njIndex:0
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
    console.log(11111111111);
    console.log(val);
    if (val[0] != me.data.lastValue[0]) { //改变了年
      if (val[0] == 0) { //今年
        var months = [];
        for (let i = date.getMonth(); i <= 11; i++) {
          var k = i;
          // if (0 <= i && i < 9) {
          //   k = "0" + (i + 1);
          // } else {
          k = (i + 1);
          // }
          months.push(k)
        }
        this.setData({
          months: months
        })
        //恢复日为当前实际日
        var days = [];
        for (let i = date.getDate(); i <= 31; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          days.push(k)
        }
        this.setData({
          days: days
        })
        console.log(months);
        console.log(days);
        //都显示第一条
        this.setData({
          value: [0, 0, 0, 0]
        })
      } else { //非当前年
        console.log("改变到某年");
        this.setData({
          months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        })
        //根据当前年和月的第一条来算出日一共有多少天
        var nian = val[0];
        var totalDay = mGetDate(this.data.years[val[0]], this.data.months[val[1]]);
        var changeDate = [];
        for (let i = 1; i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days: changeDate
        })
        this.setData({
          value: [val[0], 0, 0, 0]
        })
      }
    } else if (val[1] != me.data.lastValue[1]) { //改变了月
      if (val[0] == 0 && val[1] == 0) { //当前月
        var totalDay = mGetDate(this.data.years[val[0]], nowMonth + 1);
        var changeDate = [];
        for (let i = date.getDate(); i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days: changeDate
        })
        this.setData({
          value: [val[0], val[1], 0, 0]
        })
      } else { //月份不是当前月
        var totalDay = mGetDate(this.data.years[val[0]], this.data.months[val[1]]);
        var changeDate = [];
        for (let i = 1; i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days: changeDate
        })
        this.setData({
          value: [val[0], val[1], 0, 0]
        })
      }
    } else if (val[2] != me.data.lastValue[2]) { //改变了日
      this.setData({
        value: [val[0], val[1], val[2], 0]
      })
    } else {
      this.setData({
        value: [val[0], val[1], val[2], val[3]]
      })
    }
    console.log("起始时间：" + this.data.years[this.data.value[0]] + "年" + this.data.months[this.data.value[1]] + "月" + this.data.days[this.data.value[2]] + "日" + this.data.hours[this.data.value[3]] + "时");
    this.setData({
      beginTime: "20" + this.data.years[this.data.value[0]] + "-" + this.data.months[this.data.value[1]] + "-" + this.data.days[this.data.value[2]] + " " + this.data.hours[this.data.value[3]]
    })
    me.setData({
      lastValue: val
    })

  },


  bindChange1: function(e) {
    var me = this;
    var val = e.detail.value
    console.log(11111111111);
    console.log(val);
    if (val[0] != me.data.lastValue1[0]) { //改变了年
      if (val[0] == 0) { //今年
        var months1 = [];
        for (let i = date.getMonth(); i <= 11; i++) {
          var k = i;
          // if (0 <= i && i < 9) {
          //   k = "0" + (i + 1);
          // } else {
          k = (i + 1);
          // }
          months1.push(k)
        }
        this.setData({
          months1: months1
        })
        //恢复日为当前实际日
        var days1 = [];
        for (let i = date.getDate(); i <= 31; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          days1.push(k)
        }
        this.setData({
          days1: days1
        })
        console.log(months1);
        console.log(days1);
        //都显示第一条
        this.setData({
          value1: [0, 0, 0, 0]
        })
      } else { //非当前年
        console.log("改变到某年");
        this.setData({
          months1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        })
        //根据当前年和月的第一条来算出日一共有多少天
        var nian = val[0];
        var totalDay = mGetDate(this.data.years[val[0]], this.data.months[val[1]]);
        var changeDate = [];
        for (let i = 1; i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days1: changeDate
        })
        this.setData({
          value1: [val[0], 0, 0, 0]
        })
      }
    } else if (val[1] != me.data.lastValue1[1]) { //改变了月
      if (val[0] == 0 && val[1] == 0) { //当前月
        var totalDay = mGetDate(this.data.years1[val[0]], nowMonth + 1);
        var changeDate = [];
        for (let i = date.getDate(); i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days1: changeDate
        })
        this.setData({
          value1: [val[0], val[1], 0, 0]
        })
      } else { //月份不是当前月
        var totalDay = mGetDate(this.data.years1[val[0]], this.data.months1[val[1]]);
        var changeDate = [];
        for (let i = 1; i <= totalDay; i++) {
          var k = i;
          // if (0 <= i && i < 10) {
          //   k = "0" + i
          // }
          changeDate.push(k)
        }
        this.setData({
          days1: changeDate
        })
        this.setData({
          value1: [val[0], val[1], 0, 0]
        })
      }
    } else if (val[2] != me.data.lastValue1[2]) { //改变了日
      this.setData({
        value1: [val[0], val[1], val[2], 0]
      })
    } else {
      this.setData({
        value1: [val[0], val[1], val[2], val[3]]
      })
    }
    console.log("结束时间：" + this.data.years1[this.data.value1[0]] + "年" + this.data.months1[this.data.value1[1]] + "月" + this.data.days1[this.data.value1[2]] + "日" + this.data.hours1[this.data.value1[3]] + "时");
    this.setData({
      endTime: "20" + this.data.years1[this.data.value1[0]] + "-" + this.data.months1[this.data.value1[1]] + "-" + this.data.days1[this.data.value1[2]] + " " + this.data.hours1[this.data.value1[3]]
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
    var me = this;
    util.getMemberInfo(function (res) {
      console.log(res);
      var xueyuan = "";
      var banji = "";
      var zhuanye = "";
      me.setData({
        memberInfo: res,
        xingming: res.name,
        xingbie: res.sex,
        xueyuan: res.college.name,
        banji: res.classs.no,
        dianhua: res.phone,
        zhuanye: res.majorName,
        nianji: res.grade
      })
      var college = res.college.name;
      var classs = res.classs.no;
      var majorName = res.majorName;
      var nianji = res.grade;
      if (nianji) {
        for (var i = 0; i < me.data.njList.length; i++) {
          if (nianji == i) {
            me.setData({
              njIndex: i
            })
          }
        }
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
        util.getRequest("f/xb/mer/getColleges", {}, function (res) {
          console.log(res.data);
          var collegeList = res.data.data;
          me.setData({
            collegeList
          })
          for (var i = 0; i < collegeList.length; i++) {
            if (college == collegeList[i].name) {
              me.setData({
                collegeIndex: i,
                collegeId: collegeList[i].id
              })
            }
          }
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
      me.getShenpi();
      me.getParent();
    });
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
      console.log(majorList);
      me.setData({
        majorList,
        majorIndex: 0,
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
  bindPickerChange0: function (e) {
    this.setData({
      njIndex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
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
    for (var i = 0; i < collegeList.length; i++) {
      if (e.detail.value == i) {
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
  getShenpi: function() {
    var me = this;
    util.getRequest("f/xb/leave/getLeaveAppr", {
      openId: me.data.memberInfo.openId,
    }, function(res) {
      console.log(res.data);
      var shenpiList = res.data.data;
      me.setData({
        shenpiList
      })
    });
  },
  chooseType: function(e) {
    var index = e.currentTarget.dataset.index;
    var qingjia = this.data.qingjia;
    for (var i = 0; i < this.data.qingjiaType.length; i++) {
      if (index == i) {
        qingjia = this.data.qingjiaType[i];
      }
    }
    this.setData({
      qingjiaIndex: index,
      qingjia
    })
  },
  getParent: function() {
    var me = this;
    util.postRequest("f/xb/mer/guardianMess", {
      openId: me.data.memberInfo.openId,
      no: me.data.memberInfo.no
    }, function(res) {
      console.log(res.data);
      var data1 = res.data.data1;
      var data2 = res.data.data2;
      me.setData({
        data1,
        data2
      })
    })
  },

  bindRegionChange: function(e) {
    console.log(e);
    var region = e.detail.value;
    console.log(region);
    this.setData({
      region: region,
      addrName: region[0] + region[1] + region[2]
    })
  },
  addrDetail: function(e) {
    console.log(e);
    var addrDetail = e.detail.value;
    this.setData({
      addrDetail
    })
  },
  qingjiaReason: function(e) {
    console.log(e);
    var qingjiaReason = e.detail.value;
    this.setData({
      qingjiaReason
    })
  },
  uploadImg1: function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        me.setData({
          img1: tempFilePaths[0]
        })
        wx.uploadFile({
          url: requestUrl + '/f/xb/leave/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            openId: me.data.memberInfo.openId
          },
          complete: function(res) {
            console.log(res);
            var data = JSON.parse(res.data)
            console.log(data);
            if (data.status == 'success') {
              var imgList = me.data.imgList;
              imgList[0] = data.imgUrl;
              me.setData({
                imgList
              })
            } else {}
          }
        })
      }
    })
  },
  bindlongpressimg1: function() {
    var me = this;
    me.setData({
      img1: '../../../images/zhanwei1.png'
    })
  },
  uploadImg2: function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        me.setData({
          img2: tempFilePaths[0]
        })
        wx.uploadFile({
          url: requestUrl + '/f/xb/leave/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            openId: me.data.memberInfo.openId
          },
          complete: function(res) {
            console.log(res);
            var data = JSON.parse(res.data)
            console.log(data);
            if (data.status == 'success') {
              var imgList = me.data.imgList;
              imgList[1] = data.imgUrl;
              me.setData({
                imgList
              })
            } else {}
          }
        })
      }
    })
  },
  bindlongpressimg2: function() {
    var me = this;
    me.setData({
      img2: '../../../images/zhanwei1.png'
    })
  },

  uploadImg3: function() {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        me.setData({
          img3: tempFilePaths[0]
        })
        wx.uploadFile({
          url: requestUrl + '/f/xb/leave/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            openId: me.data.memberInfo.openId
          },
          complete: function(res) {
            console.log(res);
            var data = JSON.parse(res.data)
            console.log(data);
            if (data.status == 'success') {
              var imgList = me.data.imgList;
              imgList[2] = data.imgUrl;
              me.setData({
                imgList
              })
            } else {}
          }
        })
      }
    })
  },
  bindlongpressimg3: function() {
    var me = this;
    me.setData({
      img3: '../../../images/zhanwei1.png'
    })
  },


  back: function() {
    wx.navigateBack({})
  },

  xingming: function(e) {
    var me = this;
    var xingming = e.detail.value;
    me.setData({
      xingming
    })
  },
  xueyuan: function(e) {
    var me = this;
    var xueyuan = e.detail.value;
    me.setData({
      xueyuan
    })
  },
  xingbie: function(e) {
    var me = this;
    var xingbie = e.detail.value;
    me.setData({
      xingbie
    })
  },
  nianji: function(e) {
    var me = this;
    var nianji = e.detail.value;
    me.setData({
      nianji
    })
  },
  zhuanye: function(e) {
    var me = this;
    var zhuanye = e.detail.value;
    me.setData({
      zhuanye
    })
  },
  dianhua: function(e) {
    var me = this;
    var dianhua = e.detail.value;
    me.setData({
      dianhua
    })
  },
  banji: function(e) {
    var me = this;
    var banji = e.detail.value;
    me.setData({
      banji
    })
  },
  jhrName1: function(e) {
    var me = this;
    var jhrName1 = e.detail.value;
    me.setData({
      jhrName1
    })
  },
  jhrGuanxi1: function(e) {
    var me = this;
    var jhrGuanxi1 = e.detail.value;
    me.setData({
      jhrGuanxi1
    })
  },
  jhrPhone1: function(e) {
    var me = this;
    var jhrPhone1 = e.detail.value;
    me.setData({
      jhrPhone1
    })
  },
  jhrName2: function(e) {
    var me = this;
    var jhrName2 = e.detail.value;
    me.setData({
      jhrName2
    })
  },
  jhrGuanxi2: function(e) {
    var me = this;
    var jhrGuanxi2 = e.detail.value;
    me.setData({
      jhrGuanxi2
    })
  },
  jhrPhone2: function(e) {
    var me = this;
    var jhrPhone2 = e.detail.value;
    me.setData({
      jhrPhone2
    })
  },

  tijiao: function() {
    var me = this;
    me.setData({mbShow:''})
    wx.showLoading({});
    var xingming = me.data.xingming;
    var xueyuan = me.data.xueyuan;
    xueyuan = me.data.collegeId;
    var xingbie = me.data.xingbie;
    xingbie = me.data.sexIndex
    console.log(xingbie);
    var nianji = me.data.nianji;
    nianji = me.data.njList[me.data.njIndex];
    var zhuanye = me.data.zhuanye;
    zhuanye = me.data.majorId;
    var dianhua = me.data.dianhua;
    var banji = me.data.banji;
    var jhrName1 = me.data.jhrName1 ? me.data.jhrName1 : me.data.data1.name
    var jhrGuanxi1 = me.data.jhrGuanxi1 ? me.data.jhrGuanxi1 : me.data.data1.relationship;
    var jhrPhone1 = me.data.jhrPhone1 ? me.data.jhrPhone1 : me.data.data1.phone;
    var jhrName2 = me.data.jhrName2 ? me.data.jhrName2 : me.data.data2.name;
    var jhrGuanxi2 = me.data.jhrGuanxi2 ? me.data.jhrGuanxi2 : me.data.data2.relationship;
    var jhrPhone2 = me.data.jhrPhone2 ? me.data.jhrPhone2 : me.data.data2.phone;
    var addrName = me.data.addrName;
    var addrDetail = me.data.addrDetail;
    var qingjiaReason = me.data.qingjiaReason;
    if (!xingming) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!xueyuan) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入学院',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    // if (!xingbie) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '请输入性别',
    //   })
    //   return;
    // }
    if (!nianji) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入年级',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!zhuanye) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入专业',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!dianhua) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入电话',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(dianhua))) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!banji) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入班级',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!jhrName1 && !jhrName2) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入至少一位监护人姓名',
      })
      me.setData({ mbShow: 'none' })
      return;
    } else {
      if (jhrName1) {
        if (!jhrGuanxi1) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入监护人关系',
          })
          me.setData({ mbShow: 'none' })
          return;
        }
        if (!jhrPhone1) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入监护人联系方式',
          })
          me.setData({ mbShow: 'none' })
          return;
        }
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(jhrPhone1))) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入正确的手机号',
          })
          me.setData({ mbShow: 'none' })
          return;
        }

      }else
      if (jhrName2) {
        if (!jhrGuanxi2) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入监护人关系',
          })
          me.setData({ mbShow: 'none' })
          return;
        }
        if (!jhrPhone2) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入监护人联系方式',
          })
          me.setData({ mbShow: 'none' })
          return;
        }
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(jhrPhone2))) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请输入正确的手机号',
          })
          me.setData({ mbShow: 'none' })
          return;
        }
      }
    }
    var beginTime = me.data.beginTime;
    var endTime = me.data.endTime;
    if (!beginTime) {
      beginTime = "20" + me.data.years[me.data.value[0]] + "-" + me.data.months[me.data.value[1]] + "-" + me.data.days[me.data.value[2]] + " " + me.data.hours[me.data.value[3]]
    }
    if (!endTime) {
      endTime = "20" + me.data.years1[me.data.value1[0]] + "-" + me.data.months1[me.data.value1[1]] + "-" + me.data.days1[me.data.value1[2]] + " " + me.data.hours1[me.data.value1[3]]
    }
    console.log(beginTime);
    console.log(endTime);
    if (me.data.years[me.data.value[0]] - 0 > me.data.years1[me.data.value1[0]] - 0) {
      //开始年份大于结束年份
      console.log("时间不对");
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请假时间不正确',
      })
      me.setData({ mbShow: 'none' })
      return;
    } else if (me.data.years[me.data.value[0]] - 0 == me.data.years1[me.data.value1[0]] - 0) {
      //开始年份等于结束年份
      if (me.data.months[me.data.value[1]] - 0 > me.data.months1[me.data.value1[1]] - 0) {
        console.log("时间不对");
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '请假时间不正确',
        })
        me.setData({ mbShow: 'none' })
        return;
      } else if (me.data.months[me.data.value[1]] - 0 == me.data.months1[me.data.value1[1]] - 0) {
        if (me.data.days[me.data.value[2]] - 0 > me.data.days1[me.data.value1[2]] - 0) {
          console.log("时间不对");
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请假时间不正确',
          })
          me.setData({ mbShow: 'none' })
          return;
        } else if (me.data.days[me.data.value[2]] - 0 == me.data.days1[me.data.value1[2]] - 0) {
          if (me.data.hours[me.data.value[3]] - 0 >= me.data.hours1[me.data.value1[3]] - 0) {
            console.log("时间不对");
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '请假时间不正确',
            })
            me.setData({ mbShow: 'none' })
            return;
          }
        }
      }
    } else if (me.data.years[me.data.value[0]] - 0 < me.data.years1[me.data.value1[0]] - 0) {
      //开始年份小于结束年份
      if (me.data.months[me.data.value[1]] - 0 > me.data.months1[me.data.value1[1]] - 0) {
        console.log("时间不对");
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '请假时间不正确',
        })
        me.setData({ mbShow: 'none' })
        return;
      } else if (me.data.months[me.data.value[1]] - 0 == me.data.months1[me.data.value1[1]] - 0) {
        if (me.data.days[me.data.value[2]] - 0 > me.data.days1[me.data.value1[2]] - 0) {
          console.log("时间不对");
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请假时间不正确',
          })
          me.setData({ mbShow: 'none' })
          return;
        } else if (me.data.days[me.data.value[2]] - 0 == me.data.days1[me.data.value1[2]] - 0) {
          if (me.data.hours[me.data.value[3]] - 0 >= me.data.hours1[me.data.value1[3]] - 0) {
            console.log("时间不对");
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '请假时间不正确',
            })
            me.setData({ mbShow: 'none' })
            return;
          }
        }
      } else if (me.data.months[me.data.value[1]] - 0 < me.data.months1[me.data.value1[1]] - 0) {
        if (me.data.days[me.data.value[2]] - 0 > me.data.days1[me.data.value1[2]] - 0) {
          console.log("时间不对");
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: '请假时间不正确',
          })
          me.setData({ mbShow: 'none' })
          return;
        } else if (me.data.days[me.data.value[2]] - 0 == me.data.days1[me.data.value1[2]] - 0) {
          if (me.data.hours[me.data.value[3]] - 0 >= me.data.hours1[me.data.value1[3]] - 0) {
            console.log("时间不对");
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '请假时间不正确',
            })
            me.setData({ mbShow: 'none' })
            return;
          }
        } else if (me.data.days[me.data.value[2]] - 0 < me.data.days1[me.data.value1[2]] - 0) {
          if (me.data.hours[me.data.value[3]] - 0 >= me.data.hours1[me.data.value1[3]] - 0) {
            console.log("时间不对");
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '请假时间不正确',
            })
            me.setData({ mbShow: 'none' })
            return;
          }
        }
      }
    }
    if (!addrDetail) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入详细地址',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    if (!qingjiaReason) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: '请输入请假事由',
      })
      me.setData({ mbShow: 'none' })
      return;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: requestUrl + '/f/xb/mer/faceAuth',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            openId: me.data.memberInfo.openId
          },
          success: function(res) {
            console.log(res);
            var data = JSON.parse(res.data)
            console.log(data);
            if (data.status == 'success') {
              util.postRequest("f/xb/leave/saveLeave", {
                openId: me.data.memberInfo.openId,
                stuName: xingming,
                college: xueyuan,
                sex: xingbie,
                grade: nianji,
                major: zhuanye,
                phone: dianhua,
                className: banji,
                guardianName: jhrName1 ? jhrName1 : "",
                guardianRelation: jhrGuanxi1 ? jhrGuanxi1 : "",
                guardianPhone: jhrPhone1 ? jhrPhone1 : "",
                guardianNameOther: jhrName2 ? jhrName2 : "",
                guardianRelationOther: jhrGuanxi2 ? jhrGuanxi2 : "",
                guardianPhoneOther: jhrPhone2 ? jhrPhone2 : "",
                startTime1: beginTime,
                endTime1: endTime,
                leaveType: me.data.qingjia,
                province: me.data.region[0],
                city: me.data.region[1],
                area: me.data.region[2],
                addrDetails: addrDetail,
                reason: qingjiaReason,
                imgUrlOne: me.data.imgList[0],
                imgUrlTwo: me.data.imgList[1],
                imgUrlThree: me.data.imgList[2]
              }, function(res) {
                console.log(res.data);
                wx.hideLoading();
                if (res.data.status == 'success') {
                  me.setData({
                    mbShow: '',
                    successshow: ''
                  })
                } else {
                  me.setData({
                    mbShow: '',
                    failShow: ''
                  })
                }
              });
            } else {
              wx.showToast({
                icon: 'none',
                title: '拍照认证失败，请重新点击提交认证',
              })
              me.setData({ mbShow: 'none' })
            }
          },
          fail: function(res) {
            wx.showToast({
              icon: 'none',
              title: '拍照认证失败，请重新点击提交认证',
            })
            me.setData({ mbShow: 'none' })
          }
        })
      }
    })
  },
  again: function() {
    this.setData({
      mbShow: 'none',
      failShow: 'none'
    })
  },
  ok: function() {
    wx.navigateTo({
      url: '../../index/index',
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