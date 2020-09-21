//app.js
App({
  onLaunch: function () {
    wx.loadFontFace({
      family: 'zihun144',
      global: true,
      source: 'url("https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/zihun.ttf?sign=61b47d64ca8725996f134c3705f6ab32&t=1600702016")',
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

    // 从缓存中取出配置
    try {

      var config = wx.getStorageSync('config');
      if(config){
        this.globalData.config = config;
      }
    }catch(e){
    }
   
    

  },
  globalData: {
    userInfo: null,
    navHeight: 0,
    config: {useVoice: true, useShake: true, useCache: true, sportRatio: "6:4"}
  }
})