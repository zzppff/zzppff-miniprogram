//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    hidden: true,
    randomWord: [
      'face',
      'declare',
      'warn',
      'obey',
      'grade',
      'expensive',
      'announce',
      'nowhere',
      'persuade',
      'decision',
      'real',
      'seldom',
      'need',
      'spot',
      'anyway',
      'punish',
      'challenge',
      'situation',
      'extraordinary',
      'frost',
      'convince',
      'shock',
      'slight',
      'unfair'
    ],
    historyList: [],
    listHide: true
  },
  //事件处理函数
  onLoad: function (option) {
    
  },
  onShow: function () {
    const that = this
    wx.getStorage({
      key: 'historyList',
      success: function(res) {
        console.log('缓存获取成功')
        that.setData({
          historyList: res.data
        })
      },
      fail: function () {
        console.log('缓存获取失败')
        that.setData({
          randomList: util.getRandom(that.data.randomWord, 5)
        })
      }
    })
    
  },
  //获取焦点时展示搜索记录
  historyList: function () {
    this.setData({
      hidden: true,
      inputValue: ''
    })
  },
  //历史列表点击搜索方法
  historySearch: function (e) {
    const that = this
    const text = e.currentTarget.dataset.key
    console.log(text)
    that.setData({
      text: text
    }, ()=> {
      that.toSearch()
    })
  },
  //获取单词释义
  toSearch: function () {
    const word = this.data.text
    const that = this
    //直接入栈即可，使用let返回的是长度值报错
    that.data.historyList.unshift(word)
    console.log("word-->" + word)
    //扇贝API获取单词释义
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + word,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log("单词释义-->" + res.data)
        that.setData({
          content: res.data,
          hidden: false,
          historyList: that.data.historyList
        })
      },
      fail: function () {
        wx.showModal({
          title: '',
          content: '网络错误',
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
  },
  //播放音频
  playAudio: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.content.data.audio_addresses.us[0]
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    //循环播放bug 需播放完后销毁音频
    innerAudioContext.onStop(() => {
      innerAudioContext.destroy()
    })
    //播放错误时输出错误，销毁音频重新播放
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      innerAudioContext.destroy()
    })
  },
  //获取表单数据
  getText: function (e) {
    this.setData({
      text: e.detail.value,
      hidden: true
    })
  },
  //清空表单数据
  clearInput: function () {
    this.setData({
      typeValue: '',
      text: ''
    })
  },
  //设置搜索缓存
  searchStorage: function () {
    const that = this
    console.log('退出页面')
    wx.setStorage({
      key: 'historyList',
      data: that.data.historyList,
      success: function () {
        console.log('缓存成功')
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '单词搜索+搜索记录示例',
      path: 'pages/searchWord/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onHide: function () {
    this.searchStorage()
  },
  onUnload: function () {
    this.searchStorage()
  }
})