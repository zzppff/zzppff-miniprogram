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
    audioList: [
      {
        title: '你把我灌醉',
        singer: '邓紫棋',
        epname: '',
        navImg: 'https://62.234.33.12/audio/you/nav.png',
        coverImg: 'https://62.234.33.12/audio/you/cover.png',
        src: [
          'https://62.234.33.12/audio/you/cq.mp3',
          'https://62.234.33.12/audio/you/hq.mp3',
          ''
        ]
      },
      {
        title: '北京北京',
        singer: '邓紫棋',
        epname: '',
        navImg: 'https://62.234.33.12/audio/beijing/nav.png',
        coverImg: 'https://62.234.33.12/audio/beijing/cover.png',
        src: [
          '',
          'https://62.234.33.12/audio/beijing/hq.mp3',
          'https://62.234.33.12/audio/beijing/sq.wav'
        ]
      },
      {
        title: '夜空中最亮的星',
        singer: '邓紫棋',
        epname: '',
        navImg: 'https://62.234.33.12/audio/star/nav.png',
        coverImg: 'https://62.234.33.12/audio/star/cover.png',
        src: [
          'https://62.234.33.12/audio/star/cq.mp3',
          'https://62.234.33.12/audio/star/hq.mp3',
          ''
        ]
      }
    ]
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    const that = this
    wx.setStorage({
      key: 'audioList',
      data: that.data.audioList
    })
    backgroundAudioManager.onEnded(function () {
      var index = (that.data.indexs + 1) < that.data.audioList.length ? ((that.data.indexs) + 1) : 0
      that.setData({
        currents: that.data.audioList[index],
        indexs: index
      }, () => {
        that.audio()
      })
    })
    backgroundAudioManager.onNext(function () {
      var index = (that.data.indexs + 1) < that.data.audioList.length ? ((that.data.indexs) + 1) : 0
      that.setData({
        currents: that.data.audioList[index],
        indexs: index,
        marginL: 0
      }, () => {
        that.audio()
      })
    })
    backgroundAudioManager.onPrev(function () {
      var index = that.data.indexs == 0 ? ((that.data.audioList.length) - 1) : ((that.data.indexs) - 1)
      that.setData({
        currents: that.data.audioList[index],
        indexs: index
      }, () => {
        that.audio()
      })
    })
    backgroundAudioManager.onError(function () {
      var index = (that.data.indexs + 1) < that.data.audioList.length ? ((that.data.indexs) + 1) : 0
      that.setData({
        currents: that.data.audioList[index],
        indexs: index
      }, () => {
        that.audio()
      })
      console.log("出错了,播放下一个")
    })
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
              if (item.src[i] === res.dataUrl) {
                that.setData({
                  i: i,
                  audioMsg: item,
                  indexs: audioList.indexOf(item)
                })
                //返回值为i时返回形式是audioList[i]
                //需要直接setData保留i的值
                //return i
              }
            }
          })
        }
      }
    })
  },
  playAudio: function(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const indexs = that.data.indexs
    if (indexs == index) {
      wx.navigateTo({
        url: '../content/index',
      })
    } else {
      that.setData({
        currents: that.data.audioList[index],
        indexs: index
      }, () => {
        that.audio()
        //that.toContent()
      })
    }
  },
  //下个版本用到
  // toContent: function() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   //音乐加载时间无法预估，查询到音乐开始播放后跳转
  //   const isPlay = setInterval (function () {
  //     wx.getBackgroundAudioPlayerState({
  //       success(res) {
  //         console.log(res.status)
  //         if (res.status != 2) {
  //           wx.hideLoading()
  //           clearInterval(isPlay)
  //           console.log("定时器")
  //           wx.navigateTo({
  //             url: '../content/index',
  //           })
  //         }
  //       }
  //     })
  //   }, 100) 
  // },
  audio: function() {
    const that = this
    const currents = that.data.currents
    backgroundAudioManager.title = currents.title
    backgroundAudioManager.epname = currents.epname
    backgroundAudioManager.singer = currents.singer
    backgroundAudioManager.coverImgUrl = currents.coverImg
    //默认播放最高品音质若最高品音质不存在，则自动降低
    backgroundAudioManager.src = (currents.src[2]) != '' ? (currents.src[2]) : (currents.src[1])
  }
})