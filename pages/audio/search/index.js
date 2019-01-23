//index.js
//获取应用实例
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
const backgroundAudioManagers = {
  //原生backgroundAudioManager无回调方法，添加回调
  seek: function (options) {
    wx.seekBackgroundAudio(options);
  }
}

Page({

  data: {
    defImg: 'https://zzppff.cn/images/def.jpg'
  },
  onLoad: function (options) {

  },
  onShow: function () {
    //获取屏幕尺寸
    const screenWidth = wx.getSystemInfoSync().windowWidth
    const screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      //获取页面初始状态图片数量，0.24为图片容器的高度值(24vw)
      listIndex: screenHeight / (screenWidth * 0.24),
      screenWidth: screenWidth,
      screenHeight: screenHeight
    })
  },
  // 滚动事件 
  onPageScroll(e) { 
    //滚动距离+屏幕高度换算vw倍数
    let listIndex = (e.scrollTop + this.data.screenHeight) / (this.data.screenWidth * 0.24)
    this.setData({
      listIndex: listIndex
    })
  },

  playAudio: function(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const indexs = that.data.indexs
    that.setData({
      currents: that.data.audioList[index],
      indexs: index
    }, () => {
      that.audio()
    })
  },
  
  audio: function() {
    const that = this
    const currents = that.data.currents
    backgroundAudioManager.title = currents.name
    backgroundAudioManager.epname = ''
    backgroundAudioManager.singer = currents.singer
    backgroundAudioManager.coverImgUrl = currents.pic
    backgroundAudioManager.src = currents.url
  },
  //歌曲搜索方法
  // audioInput: function (e) {
  //   this.search(e.detail.value)
  // },
  audioConfirm: function (e) {
    this.search(e.detail.value)
  },
  search: function (key) {
    const that = this
    wx.request({
      //音乐搜索接口来源为bzqll，部分收费，使用请先沟通
      url: 'https://api.bzqll.com/music/tencent/search?key=579621905&s='+ key +'&limit=100&offset=0&type=song',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          audioList: res.data.data
        })
      }
    })
    
  }
})