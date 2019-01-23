//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      { title: '本地音频播放示例', link: 'audio/list', append: ''},
      { title: '音乐搜索播放示例', link: 'audio/search', append: '' },
      { title: '图片懒加载示例', link: 'lazyLoad', append: '' }
    ],
    bulingHide: true
  },
  onLoad: function () {
    
  },
  linkToList: function (e) {
    const link = e.currentTarget.dataset.key
    console.log('link--->' + link)
    wx.navigateTo({
      url: '../' + link + '/index',
    })
  },
  bodyClick: function(e) {
    var that = this
    console.log(e.touches[0].clientX)
    that.setData({
      clientX: e.touches[0].clientX - 16,
      clientY: e.touches[0].clientY - 28,
      bulingHide: false
    })
    setTimeout(function () {
      that.setData({
        bulingHide: true
      })
    }, 200)
  }
})
