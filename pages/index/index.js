//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    gamelist: [
      {
        imgsrc: '/imges/packet.png',
        name: '天天领红包',
        tips: '饿了么 & 美团外卖',
        classname: 'packet',
        url: '../packet/packet'
      },
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
    infos1: "更多实用功能开发中",
    infos2: "拯救选择困难症和纠结患者",
    showUpdate: false,
    hidden: 'hidden'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      // 检查是否第一次进入
      try {
        var isFirst =  wx.getStorageSync('2020-3-16');
        if(!isFirst){
            // 第一次进入则推送最近更新内容
            this.setData({
              showUpdate: true
            })
            wx.setStorage({
              data: true,
              key: '2020-3-16'
            })
        }
      }catch(e) {

      }
  },
  onHide:function(){
    

  },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '不要纠结啦，叮咚决策器帮你做决定!',
        imageUrl: '/imges/share-home.png'
      }
    },
    onShareTimeline(){
      return {
        title: '不要纠结啦，叮咚决策器帮你做决定!',
        imageUrl: '/imges/share-home.png'
      }
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
  },
  closeModal(){
    this.setData({
      showUpdate: false
    })
  },
  clickModal(){}
})
