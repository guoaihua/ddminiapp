//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    gamelist: [
      {
        imgsrc: '/imges/coin.png',
        name: '抛硬币',
        tips: '二选一',
        classname: 'coin',
        url: '../coin/coin'
      },
      {
        imgsrc: '/imges/dice.png',
        name: '掷骰子',
        tips: '随机数',
        classname: 'dice',
        url: '../dice/dice'
      },
      {
        imgsrc: '/imges/turnplate.png',
        name: '大转盘',
        tips: '多选一',
        classname: 'turnplate',
        url: '../turnplate/turnplate'
      },      {
        imgsrc: '/imges/eatting.png',
        name: '今天吃什么',
        tips: '随机词',
        classname: 'eatting',
        url: '../eatting/eatting'
      },
      {
        imgsrc: '/imges/sport.png',
        name: '今天运动吗',
        tips: '二选一',
        classname: 'sport',
        url: "../sport/sport"
      },
      {
        imgsrc: '/imges/random.png',
        name: '随机数生成',
        tips: '随机数',
        classname: 'random',
        url: '../random/random'
      }
    ],
    infos1: "更多功能开发中",
    infos2: "拯救选择困难症和纠结患者"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  onHide:function(){
    

  },
  getUserInfo: function(e) {
   

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotoDetail(e){
    var self = this;
    let url = e.currentTarget.dataset.url;

    if(url){

      wx.navigateTo({
        url: url,
        success: function(data){
        },
        fail:function(err){
          console.log(err);
        }
      });
    }
  }
})
