var util = require('../../utils/util');
var app = getApp()
var requestUrl = app.globalData.requestUrl
var imgUrl = app.globalData.imgUrl
var timer = null;
Page({
  data: {
    imgUrl: imgUrl,
    requestUrl: requestUrl,
    height: 64, //header高度
    top: 0, //标题图标距离顶部距离
    times: '5',
    loginTop: '100',
    kbshow: 'none',
    mbShow: 'none',
    loginShow: 'none',
    tishiShow: 'none',
    successshow: 'none',
    failshow: 'none',
    djsShow: '',
    tiaoguoShow: 'none',
    quedingShow: 'none',
    bannerlist: [],
    sliderIndex: 0,
    sliderIndex2: 0,
    swiperH: '',
    startX: 0,
    endX: 0,
    iCenter: 3,
    isScroll: true,
    overflowy: '',
    leaveStatus: 0,
    datas: [{
        id: 4,
        zIndex: 8,
        opacity: 1,
        left: 160,
        iamge: "../../images/zw4.png",
        animation: null
      },
      {
        id: 5,
        zIndex: 6,
        opacity: 0.6,
        left: 180,
        iamge: "../../images/zw5.png",
        animation: null
      },
      {
        id: 6,
        zIndex: 4,
        opacity: 0.4,
        left: 200,
        iamge: "../../images/zw6.png",
        animation: null
      },
      {
        id: 7,
        zIndex: 2,
        opacity: 0.2,
        left: 220,
        iamge: "../../images/zw3.png",
        animation: null
      },
    ],
    order: []
  },
  onLoad: function() {
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
  },
  onShow: function() {
    var me = this;
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        console.log(res.data);
        me.setData({
          memberInfo: res.data
        })
        me.getAllMsg();
        me.getQingjia();
      },
      fail: function(res) {
        console.log(res);
        console.log("没有缓存");
        wx.login({
          success: function(res) {
            var code = res.code;
            console.log(code);
            wx.request({
              url: requestUrl + '/f/xb/getUser',
              data: {
                code: code
              },
              success: function(res) {
                console.log(res);
                if (res.data.status == 'success') {
                  if (res.data.type == 0) {
                    console.log("没有用户");
                    //没有
                    me.getAllMsg();
                    me.setData({
                      loginShow: '',
                      mbShow: ''
                    })
                  } else {
                    var memberInfo = res.data.data;
                    wx.setStorage({
                      key: 'memberInfo',
                      data: memberInfo,
                    })
                    me.setData({
                      memberInfo
                    })
                    me.getAllMsg();
                    me.getQingjia();
                  }
                } else {
                  wx.showToast({
                    title: res.data.data.message,
                    icon: "loading"
                  })
                }
              }
            })
          }
        })
      },
    })
  },
  getAllMsg: function() {
    var me = this;
    var openId = '';
    if (me.data.memberInfo) {
      openId = me.data.memberInfo.openId
    }
    console.log(me.data.memberInfo);
    console.log(openId);
    util.postRequest("f/xb/index", {
      openId: openId,
    }, function(res) {
      console.log(res.data);
      var detail = res.data;
      var bannerlist = [];
      for (var i = 0; i < detail.imgs.length; i++) {
        bannerlist = bannerlist.concat(detail.imgs[i].imgPath);
      }
      var kbshow = 'none';
      if (detail.course != 1) {
        var datas = [];
        var course = detail.course;
        var index = course.length;
        var opacity = 1;
        var left = 30;
        console.log(me.data.imgUrl);
        for (var i = 0; i < course.length; i++) {
          course[i].id = i + 1;
          course[i].zIndex = index;
          course[i].opacity = opacity;
          course[i].left = left;
          course[i].animation = null;
          index--;
          opacity = opacity - 0.1;
          left = left + 10;
          datas = datas.concat(course[i]);
        }
        console.log(datas);
        me.setData({
          datas
        })
        me.__set__();
        me.move();
        me.setData({
          kbshow: ''
        })
      }
      var article = detail.article;
      var str = detail.str;
      me.setData({
        bannerlist,
        article,
        str
      })
    })
  },
  getQingjia: function() {
    var me = this;
    util.getRequest("f/xb/leave/getApprStatus", {
      openId: me.data.memberInfo.openId,
    }, function(res) {
      console.log(res.data);
      me.setData({
        leaveStatus: res.data.data
      })
    })
  },
  ids: function(e) {
    var ids = e.detail.value;
    this.setData({
      ids: ids
    })
  },
  yqm: function(e) {
    var yqm = e.detail.value;
    this.setData({
      yqm: yqm
    })
  },
  onGotUserInfo: function(e) {
    var me = this;
    var userInfo = e.detail.userInfo;
    if (!userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请允许获取头像和昵称',
      })
      return;
    }
    var ids = me.data.ids;
    if (!ids) {
      wx.showToast({
        icon: 'none',
        title: '请输入ID',
      })
      return;
    }
    var yqm = me.data.yqm;
    if (!yqm) {
      wx.showToast({
        icon: 'none',
        title: '请输入邀请码',
      })
      return;
    }

    wx.login({
      success: function(res) {
        var code = res.code;
        console.log(code);
        wx.request({
          url: requestUrl + '/f/xb/check',
          data: {
            code: code,
            no: ids,
            inv: yqm
          },
          success: function(res) {
            console.log(res.data);
            if (res.data.status == 'success') {
              var memberInfo = res.data.data;
              console.log(memberInfo);
              util.postRequest("f/xb/addPhoto", {
                photo: userInfo.avatarUrl,
                name: userInfo.nickName,
                openId: memberInfo.openId
              }, function(res) {
                console.log(res);
                wx.setStorage({
                  key: 'memberInfo',
                  data: res.data.data,
                })
                // wx.showToast({
                //   title: '操作成功',
                // })
                me.setData({
                  memberInfo: res.data.data
                })
                if (memberInfo.userType == "1") { //老师不拍照
                  wx.showToast({
                    title: '操作成功',
                  })
                  me.setData({
                    mbShow: 'none',
                    loginShow: 'none'
                  })
                  me.getAllMsg();
                } else { //学生要拍照
                  setTimeout(function() {
                    wx.chooseImage({
                      count: 1,
                      sizeType: ['compressed'],
                      sourceType: ['camera'],
                      success(res) {
                        console.log(res);
                        // tempFilePath可以作为img标签的src属性显示图片
                        const tempFilePaths = res.tempFilePaths
                        console.log(tempFilePaths);
                        if (tempFilePaths[0]) {
                          wx.showLoading({
                            title: '上传中',
                          })
                          wx.uploadFile({
                            url: requestUrl + ' f/xb/mer/upLoadAuthImg',
                            filePath: tempFilePaths[0],
                            name: 'file',
                            formData: {
                              openId: memberInfo.openId
                            },
                            complete: function(res) {
                              console.log(res);
                              var data = JSON.parse(res.data)
                              console.log(data);
                              wx.hideLoading();
                              if (data.status == 'success') {
                                wx.showToast({
                                  title: '上传成功',
                                })
                                me.setData({
                                  mbShow: 'none',
                                  loginShow: 'none'
                                })
                                setTimeout(function() {
                                  me.getAllMsg();
                                }, 500);
                              } else {
                                wx.showToast({
                                  icon: 'none',
                                  title: '系统繁忙',
                                })
                              }
                            }
                          })
                        }
                      },
                      fail: function(res) {
                        wx.showToast({
                          icon: 'none',
                          title: '请拍照',
                        })
                      }
                    })
                  }, 500);
                }
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: "loading"
              })
            }
          }
        })
      }
    })

  },
  toDetail: function(e) {
    console.log(e);
    var me = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../news/newsDetail/newsDetail?id=' + id,
    })
  },
  center: function() {
    
    wx.navigateTo({
      url: '../me/center/center',
    })
  },
  kb: function() {
    // wx.navigateTo({
    //   url: '../course/course/course',
    // })
  },
  more: function() {
    wx.navigateTo({
      url: '../news/newsList/newsList',
    })
  },
  jtsh: function() {
    wx.navigateTo({
      url: '../me/historyByTeacher/historyByTeacher',
    })
  },
  fqqd: function() {
    var me = this;
    util.postRequest("f/xb/signin/isCreate", {
      openId: me.data.memberInfo.openId
    }, function(res) {
      console.log(res.data);
      if (res.data.status = "success") {
        wx.navigateTo({
          url: '../me/sign/sign',
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '暂不能发起签到',
        })
      }
    })

  },
  shz: function() {
    var me = this;
    if (me.data.memberInfo.userType == 1) {
      wx.navigateTo({
        url: '../me/historyByTeacher/historyByTeacher',
      })
    } else {
      wx.navigateTo({
        url: '../me/history/history',
      })
    }
  },
  znqj: function() {
    var me = this;
    clearInterval(timer);
    var times = 5;
    var timer = setInterval(function() {
      if (times > 0) {
        times--;
        me.setData({
          times
        })
      } else {
        times = 0;
        me.setData({
          times
        })
        clearInterval(timer);
        me.setData({
          djsShow: 'none',
          quedingShow: ''
        })
      }
    }, 1000);
    me.setData({
      mbShow: '',
      tishiShow: '',
      djsShow: ''
    })
    console.log(me.data.memberInfo);
    var isAuth = me.data.memberInfo.isAuth;
    if (isAuth == 1) {
      me.setData({
        quedingShow: '',
        tiaoguoShow: ''
      })
    } else {}

  },

  qiandao: function() {
    var me = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        me.setData({
          mbShow: ''
        })
        util.postRequest("f/xb/signin/setSign", {
          openId: me.data.memberInfo.openId,
          latitude: latitude,
          longitude: longitude
        }, function(res) {
          console.log(res.data);
          if (res.data.status == "success") {
            if (res.data.data == 0) {
              wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['camera'],
                success(res) {
                  console.log(res);
                  // tempFilePath可以作为img标签的src属性显示图片
                  const tempFilePaths = res.tempFilePaths
                  console.log(tempFilePaths);
                  if (tempFilePaths[0]) {
                    wx.showLoading({
                      title: '上传中',
                    })
                    wx.uploadFile({
                      url: requestUrl + ' f/xb/signin/upLoadImg',
                      filePath: tempFilePaths[0],
                      name: 'file',
                      formData: {
                        openId: me.data.memberInfo.openId
                      },
                      complete: function(res) {
                        console.log(res);
                        var data = JSON.parse(res.data)
                        console.log(data);
                        wx.hideLoading();
                        me.setData({
                          mbShow: 'none'
                        })
                        if (data.status == 'success') {
                          wx.showToast({
                            title: '签到成功',
                          })
                        } else {
                          me.setData({
                            mbShow: 'none'
                          })
                          wx.showToast({
                            icon: 'none',
                            title: '系统繁忙',
                          })
                        }
                      }
                    })
                  }
                },
                fail: function(res) {
                  me.setData({
                    mbShow: 'none'
                  })
                  wx.showToast({
                    icon: 'none',
                    title: '请拍照',
                  })
                }
              })
            } else {
              me.setData({
                mbShow: 'none'
              })
              wx.showToast({
                icon: 'none',
                title: '签到失败，请调整位置后重试',
              })
            }
          } else {
            me.setData({
              mbShow: 'none'
            })
            wx.showToast({
              icon: 'none',
              title: '操作失败',
            })
          }
        })
      },
      fail(res) {
        console.log(res);
        me.showRemind();
      }
    })
  },
  openSetting: function() {
    wx.openSetting({
      success: (res) => {
        console.log(res);
        var flag = res.authSetting['scope.userLocation'];
        if (!flag) {
          this.showRemind();
        }
      },
      fail: (res) => {
        console.log(res);
        var flag = res.authSetting['scope.userLocation'];
        if (!flag) {
          this.showRemind();
        }
      }
    })
  },

  showRemind: function() {
    var me = this;
    wx.showModal({
      title: '温馨提醒',
      content: '需要获取您的地理位置才能使用小程序',
      showCancel: false,
      confirmText: '获取位置',
      success: function(res) {
        if (res.confirm) {
          //me.qiandao();
          wx.getSetting({
            success(res) {
              console.log(res);
              var flag = res.authSetting['scope.userLocation'];
              if (!flag) {
                me.openSetting();
              }
            }
          })
        }
      },
      fail: (res) => {
        //me.qiandao();
        wx.getSetting({
          success(res) {
            console.log(res);
            var flag = res.authSetting['scope.userLocation'];
            if (!flag) {
              me.openSetting();
            }
          }
        })
      }
    })
  },

  qued: function() {
    var me = this;
    me.setData({
      times: 5
    })
    util.getRequest("f/xb/updateAuth", {
      openId: me.data.memberInfo.openId,
    }, function(res) {
      console.log(res.data);
      var memberInfo = me.data.memberInfo;
      memberInfo.isAuth = 1;
      wx.setStorage({
        key: 'memberInfo',
        data: memberInfo,
      })
      wx.navigateTo({
        url: '../me/leave/leave',
      })
      me.setData({
        mbShow: 'none',
        tishiShow: 'none',
        quedingShow: 'none'
      })
    })
  },
  //获取swiper高度   轮播图
  getHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 20; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH //设置高度
    })
  },
  //swiper滑动事件
  sliderSwiperChange: function(e) {
    this.setData({
      sliderIndex: e.detail.current
    })
  },


  /*竖行图片滑动*/
  move: function() {
    var datas = this.data.datas;
    /*图片分布*/
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var animation = wx.createAnimation({
        duration: 200
      });
      animation.translateY(data.left).step();
      this.setData({
        ["datas[" + i + "].animation"]: animation.export(),
        ["datas[" + i + "].zIndex"]: data.zIndex,
        ["datas[" + i + "].opacity"]: data.opacity,
      })
    }
    console.log(this.data.datas);
  },
  /**左箭头 */
  left: function() {
    //
    var last = this.data.datas.pop(); //获取数组的最后一个
    this.data.datas.unshift(last); //放到数组的第一个
    var orderFirst = this.data.order.shift();
    this.data.order.push(orderFirst);
    this.move();
  },
  /** */
  right: function() {
    var first = this.data.datas.shift(); //获取数组的第一个
    this.data.datas.push(first); //放到数组的最后一个位置
    var orderLast = this.data.order.pop();
    this.data.order.unshift(orderLast);
    this.move();
  },
  /**点击某项 */
  choose: function(e) {
    // var that = this;
    // var id = e.currentTarget.dataset.id;
    // var order = that.data.order;
    // var index = 0;
    // for (var i = 0; i < order.length; i++) {
    //   if (id == order[i]) {
    //     index = i;
    //     break;
    //   }
    // }
    // if (index < that.data.iCenter) {
    //   for (var i = 0; i < that.data.iCenter - index; i++) {
    //     this.data.datas.push(this.data.datas.shift()); //获取第一个放到最后一个
    //     this.data.order.unshift(this.data.order.pop());
    //     // this.right()  
    //   }
    // } else if (index > that.data.iCenter) {
    //   for (var i = 0; i < index - that.data.iCenter; i++) {
    //     this.data.datas.unshift(this.data.datas.pop()); //获取最后一个放到第一个
    //     this.data.order.push(this.data.order.shift());
    //     // this.left();
    //   }
    // }
    // this.move();
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../me/timetable/timetable',
    })
  },
  /**新的排列复制到新的数组中 */
  __set__: function() {
    var that = this;
    var order = that.data.order;
    var datas = that.data.datas;
    console.log(datas);
    console.log(order);
    for (var i = 0; i < datas.length; i++) {
      that.setData({
        ["order[" + i + "]"]: datas[i].id
      })
    }
    console.log(order);
  },
  //手指触发开始移动
  moveStart: function(e) {
    var startX = e.changedTouches[0].pageY;
    console.log("开始" + startX);
    this.setData({
      startX: startX
    });
  },
  //手指触摸后移动完成触发事件
  moveItem: function(e) {
    var that = this;
    var endX = e.changedTouches[0].pageY;
    console.log("完成" + endX);
    this.setData({
      endX: endX
    });
    //计算手指触摸偏移剧距离
    var moveX = this.data.startX - this.data.endX;
    console.log("距离" + moveX);
    //向左移动
    if (moveX > 20) {
      this.left();
    }
    if (moveX < -20) {
      this.right();
    }
  },
  onUnload: function() {
    clearInterval(timer);
  },
})