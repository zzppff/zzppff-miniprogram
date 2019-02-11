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

const formatSecond = function(s) {
  let t;
  if(s > -1){
    let hour = Math.floor(s / 3600);
    let min = Math.floor(s/60) % 60;
    let sec = s % 60;
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

//随机抽取单词
const getRandom = function (arr, count) {
  let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

const sleep = function (fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }
  let lastTime = null
  return function () {
    let nowTime = + new Date()
    if (nowTime - lastTime > gapTime || !lastTime) {
      // 将this和参数传给原函数
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  formatSecond: formatSecond,
  getRandom: getRandom
}
