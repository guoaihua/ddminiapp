//app.js
App({
  onLaunch: function () {

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