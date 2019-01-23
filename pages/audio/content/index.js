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
    
  },
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'audioList',
      success: function(res) {
        that.setData({
          audioList: res.data
        })
      },
    })
  },
  onShow: function () {
    const that = this
    console.log(222)
    wx.getBackgroundAudioPlayerState({
      success(res) {
        console.log(res.status)
        if (res.status != 2) {
          const audioList = that.data.audioList
          console.log('有背景音频')
          const audioMsg = audioList.find(item => {
            //item参数为外层audioList遍历参数，i为src索引
            let i = 0
            for (i in item.src) {
              if(item.src[i] === res.dataUrl) {
                that.setData({
                  i: i,
                  audioMsg: item
                })
                //返回值为i时返回形式是audioList[i]
                //需要直接setData保留i的值
                return i 
              }
            }
          })
        }
      }
    })
  },
  input1: function (e) {
    this.search(e.detail.value)
  },
  confirm1: function (e) {
    this.search(e.detail.value)
  },
  search: function (key) {
    var that = this
    var article = wx.getStorage({
      key: 'article',
      success: function (res) {
        if (key == '') {
          that.setData({
            article: res.data
          })
          return;
        }
        var arr = [];
        for (let i in res.data) {
          res.data[i].show = false;
          if (res.data[i].search.indexOf(key) >= 0) {
            res.data[i].show = true;
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            article: [{ show: true, name: '无相关文章', link:'' }]
          })
        } else {
          that.setData({
            article: arr
          })
        }
      },
    })
  },
})