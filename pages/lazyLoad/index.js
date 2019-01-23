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
    img: [
      "https://picsum.photos/500/300?image=100",
      "https://picsum.photos/500/300?image=101",
      "https://picsum.photos/500/300?image=102",
      "https://picsum.photos/500/300?image=103",
      "https://picsum.photos/500/300?image=104",
      "https://picsum.photos/500/300?image=106",
      "https://picsum.photos/500/300?image=107",
      "https://picsum.photos/500/300?image=108",
      "https://picsum.photos/500/300?image=109",
      "https://picsum.photos/500/300?image=110",
      "https://picsum.photos/500/300?image=111",
      "https://picsum.photos/500/300?image=112",
      "https://picsum.photos/500/300?image=113",
      "https://picsum.photos/500/300?image=114",
      "https://picsum.photos/500/300?image=115",
      "https://picsum.photos/500/300?image=116",
      "https://picsum.photos/500/300?image=117",
      "https://picsum.photos/500/300?image=118",
      "https://picsum.photos/500/300?image=119",
      "https://picsum.photos/500/300?image=120",
      "https://picsum.photos/500/300?image=121",
      "https://picsum.photos/500/300?image=122",
      "https://picsum.photos/500/300?image=123",
      "https://picsum.photos/500/300?image=124",
      "https://picsum.photos/500/300?image=126",
      "https://picsum.photos/500/300?image=127",
      "https://picsum.photos/500/300?image=128",
      "https://picsum.photos/500/300?image=129"
    ]
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    //获取屏幕尺寸
    const screenWidth = wx.getSystemInfoSync().windowWidth
    const screenHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      //获取页面初始状态图片数量，0.63为图片容器的高度值(63vw)
      listIndex: screenHeight / (screenWidth * 0.63),
      screenWidth: screenWidth,
      screenHeight: screenHeight
    })
  },
  // 滚动事件 
  onPageScroll(e) { 
    //滚动距离+屏幕高度换算vw倍数
    let listIndex = (e.scrollTop + this.data.screenHeight) / (this.data.screenWidth * 0.63)
    this.setData({
      listIndex: listIndex
    })
  }
})