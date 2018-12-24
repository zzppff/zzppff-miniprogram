const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var formatSecond = function(s) {
  var t;
  if(s > -1){
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s/60) % 60;
    var sec = s % 60;
    if (hour < 10) {
      t = '0' + hour + ":";
    } else {
      t = hour + ":";
    }
    if(min < 10) {
      t += "0";
    }
    t += min + ':';
    if(sec < 10){
      t += "0";
    }
    t += sec;
    t = t.substring(3)
  }
  return t;
}

module.exports = {
  formatTime: formatTime,
  formatSecond: formatSecond
}
