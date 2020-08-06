//app.js
App({
  onLaunch: function () {
    wx.loadFontFace({
      family: 'zihun144',
      global: true,
      source: 'url("https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/zihun144.ttf?sign=f3c69fa652d024cafafec0997008beed&t=1596271078")',
      success: function(res){
        console.log(res);
      }
    })  
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight+8;
      }, fail(err) {
        console.log(err);
      }
    })  
  },
  globalData: {
    userInfo: null,
    navHeight: 0
  }
})