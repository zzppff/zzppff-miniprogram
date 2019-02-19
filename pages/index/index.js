//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [
      { title: '本地音频播放示例', link: 'audio/list', append: ''},
      { title: '音乐搜索播放示例', link: 'audio/search', append: '' },
      { title: '图片懒加载示例', link: 'lazyLoad', append: '' },
      { title: '单词搜索+搜索记录示例', link: 'searchWord', append: '' },
      { title: 'Canvas生成海报下载示例', link: 'canvas', append: '' }
    ],
    bulingHide: true
  },
  onLoad: function () {
    this.setData({
      icon: Math.ceil(Math.random() * 4)
    })
    //获取用户信息，头像，昵称
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取用户信息，头像，昵称
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //跳转方法
  linkToList: function (e) {
    const link = e.currentTarget.dataset.key
    console.log('link--->' + link)
    wx.navigateTo({
      url: '../' + link + '/index',
    })
  },
  //点击显示浮窗方法
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
  },
  //下拉刷新，暂未添加数据
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 300)
  },
})
