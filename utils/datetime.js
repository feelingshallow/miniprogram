function returnTime(EndTime) {
  var str = "";
  var NowTime = new Date();
  var t = new Date(EndTime).getTime() - NowTime.getTime();
  if (isNaN(t)) {
    EndTime = GetTimeByTimeStr(EndTime);
    NowTime = new Date();
    t = EndTime.getTime() - NowTime.getTime();
  }
  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 60 / 60 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = formatNumber(Math.floor(t / 1000 / 60 % 60));
    s = formatNumber(Math.floor(t / 1000 % 60));
    if (d) {
      str = d + "天" + h + "时" + m + "分" + s + "秒";
    } else if (h) {
      str = h + "时" + m + "分" + s + "秒";
    } else if (m) {
      str = m + "分" + s + "秒";
    } else if (s) {
      str = s + "秒";
    }
  } else {
    str = "";
  }
  return str;
}

//获取整点场次
function getHour(){
  var currHour = 0;
  var date = new Date();
  var hour = date.getHours()
  if (hour >= 8 && hour < 10) {
    currHour = 8
  } else if(hour >= 10 && hour < 12){
    currHour = 10
  } else if(hour >= 12 && hour < 14){
    currHour = 12
  } else if (hour >= 14 && hour < 16) {
    currHour = 14
  } else if (hour >= 16 && hour < 18) {
    currHour = 16
  } else if (hour >= 18 && hour < 20) {
    currHour = 18
  } else if (hour >= 20 && hour < 22) {
    currHour = 20
  } else if (hour >= 22) {
    currHour = 0
  }
  return currHour;
}

//获取下一个整点场次
function nextHour() {
  var currHour = 0;
  var date = new Date();
  var hour = date.getHours()
  if (hour >= 8 && hour < 10) {
    currHour = 10
  } else if (hour >= 10 && hour < 12) {
    currHour = 12
  } else if (hour >= 12 && hour < 14) {
    currHour = 14
  } else if (hour >= 14 && hour < 16) {
    currHour = 16
  } else if (hour >= 16 && hour < 18) {
    currHour = 18
  } else if (hour >= 18 && hour < 20) {
    currHour = 20
  } else if (hour >= 20 && hour < 22) {
    currHour = 22
  } else if (hour >= 22) {
    currHour = 0
  }
  return currHour;
}

//获取场次倒计时
function timeoutHour(){
  var hour = nextHour();
  if (hour > 0) {
    var day = formatDate(new Date());
    var endTime = day + " " + hour+":00:00";
    var remainTime = returnTime(endTime);
    remainTime = remainTime ? remainTime.replace("时", ":").replace("分", ":").replace("秒", "") : remainTime;
    return remainTime;
  }else{
    return "";
  }
}

function GetTimeByTimeStr(dateString) {
  var timeArr = dateString.split(" ");
  var d = timeArr[0].split("-");
  var t = timeArr[1].split(":");
  return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}

/**
 * 格式化数字  一位数前加0
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  returnTime: returnTime,
  formatTime: formatTime,
  getHour: getHour,
  timeoutHour: timeoutHour
}