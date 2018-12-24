//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
 
  },
  onLoad: function () {
    
  },
  linkTo: function (e) {
    const link = e.currentTarget.dataset.key
    console.log('link--->' + link)
  }
})
