// eatting/eatting/eatting.js
const App = getApp();
const foods = [
    "麻辣香锅",
    "火锅",
    "串串",
    "冒菜",
    "烧烤",
    "兰州拉面",
    "沙县小吃",
    "面食",
    "刀削面",
    "盖浇饭",
    "炒菜",
    "川菜",
    "自助餐",
    "炒面",
    "炒饭",
    "西餐",
    "牛排",
    "麦当劳",
    "肯德基",
    "水饺",
    "煎饺",
    "热干面",
    "牛肉面",
    "黄焖鸡米饭",
    "烤肉饭",
    "鸡公煲",
    "三明治",
    "饭团",
    "馄炖",
    "卤肉饭",
    "披萨",
    "日式料理",
    "沙拉",
    "炸鸡",
    "肉夹馍",
    "麻辣烫",
    "简餐盒饭",
    "粥",
    "拉面",
    "石锅拌饭",
    "烤肉",
    "咖喱饭",
    "汤饭套餐",
    "煲仔饭",
    "凉皮",
    "凉面",
    "肠粉",
    "意大利面",
    "鸡排",
    "烤鸭",
    "寿司",
    "面包",
    "汉堡",
    "米线",
    "农家菜",
    "小碗菜",
    "韩式料理",
    "湘菜",
    "大排档",
    "羊肉粉",
    "酸菜鱼",
    "鸭血粉丝",
    "烤冷面",
    "小龙虾",
    "螺蛳粉",
    "油焖大虾",
    "卤味",
    "瓦罐汤",
    "过桥米线",
    "汤包",
    "包子",
    "快餐",
    "中式快餐",
    "煎饼",
    "木桶饭",
    "牛腩煲",
    "轻食",
    "汤饭",
    "烧腊饭",
    "烤鱼",
    "麻辣拌",
    "铁板烧",
    "汉堡王",
    "蛋包饭",
    "油条",
    "三鲜面",
    "汤泡面",
    "吊锅饭",
    "卷饼",
    "锅贴",
    "花甲粉",
    "炒米粉",
    "家常菜",
    "蒸菜",
    "水果拼盘",
    "蛋糕",
    "鸡蛋灌饼",
    "油泼面",
    "手抓饼",
    "蒸饺"
  ];
const nerbyFoods = [];  
// const key = '7U7BZ-WQP63-KZK33-YVC6P-53PF3-2LFT3'; //使用在腾讯位置服务申请的key
// const category = '餐饮';
// var QQMapWX = require('../../libs/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
// 实例化API核心类
// var qqmapsdk = new QQMapWX({
//   key: key // 必填
// });

Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "不知道今天吃啥？点击按钮给你出出主意",
            start: "今天吃什么"
        },
        result: '麻辣香锅',
        status: 'start',
        pending: false,
        current: 1,
        nerbyFoods: [],
        foods: foods,
        showModal: false,
        voiceSrc: 'https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/dd/eatting.mp3',
        resultSrc: 'https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/dd/result.mp3',
        location: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        // 获取一下上一次的选择
        try {
          const last = wx.getStorageSync('lastSelect');
          console.log(last);
    

        if(last === 0){
          this.setData({
            current: 0
         })
          // // 这个时候就要主动获取周边信息了
          // self.getAuth();
        }else if(last === 1) {
          this.setData({
            current: 1
         })
        }
        }catch(e){}
        this.setData({
              navH: App.globalData.navHeight,
              config: App.globalData.config
            })


            if(options?.origin){
              this.setData({
                origin: options?.origin
              })
            }

         // showHeaderbg: false
        this.selectComponent("#header").hideheader();
        this.animate('#cont',[
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%", ease: 'ease-in-out'}
        ],300,function(){

        }.bind(this))

         if(App.globalData.config.useVoice){
            self.actx = wx.createInnerAudioContext();
            self.actx.src = this.data.voiceSrc;
    
            self.actx_result = wx.createInnerAudioContext();
            self.actx_result.src = this.data.resultSrc;
         }
  
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '不知道吃什么？我帮你参谋参谋',
        imageUrl: '/imges/share-eat.png'
      }
    },
  onShareTimeline() {
    return {
      title: '不知道吃什么？我帮你参谋参谋',
      query: 'origin=packet',
      imageUrl: '/imges/share-eat.png'
    }
  },
    vibrateLong(){
        this.data.config.useShake && wx.vibrateLong();
     },
     vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
    clickbtn(){
        var self = this;
        const {pending, current, foods, nerbyFoods, mks} = self.data;
        if(pending){
            return;
        }
        this.vibrateShort();
        this.setData({
            status: 'ques',
            pending: true,
            ["game.start"]: '换一个'
        });
        self.actx && self.actx.play();
        setTimeout(()=>{
            let foodlist=[];
            console.log(current, mks);
            if((current === 0 && mks)){
              foodlist = nerbyFoods
            }else {
              // 被迫从附近模式切换到随机模式，因为网络问题
              this.setData({
                current: 1
              });
              foodlist = foods
            }
            var random = Math.floor(Math.random()*foodlist.length);
            if(current === 0 && mks){
              // 将选中的位置存储起来
              this.setData({
                location: mks[random]
              })
            }
            self.actx_result && self.actx_result.play();
            this.vibrateLong();
            

            this.setData({
                status: 'answer',
                result: foodlist[random] || '火锅',
                pending: false
            });
        },2100)
    },
    sourceSelect(e) {
        const self = this;
        var index = e.target.dataset.id;
        let {current} = self.data;
        if(!index || current == index){
            return;
        }
        this.setData({
          status: 'middle'
      })

        switch(parseInt(index, 10)){
            case 0:
            current = 0;
            // self.getAuth();
            break;
            case 1:
            current = 1;
            break;
            default: 
            current = 1 
        }

        setTimeout(function(){
          self.setData({
            status: 'start'
         })
        }, 0)

        // 将结果缓存到页面中，下次可以直接使用
    
        wx.setStorage({
          data: current,
          key: 'lastSelect',
        });

        self.setData({
          current: current
      })

    },
    openConfirm: function () {
        wx.showModal({
          content: '检测到您没打开此小程序的定位权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            //点击“确认”时打开设置页面
            if (res.confirm) {
              console.log('用户点击确认')
              wx.openSetting({
                success: (res) => { 

                }
              })
            } else {
              console.log('用户点击取消')
            }
          }
        });
      },
    getAuth(){
        var self = this;
        const { location } = this.data;
        wx.getSetting({
          success(res){
            if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success() {
                    wx.getLocation({
                      type: 'gcj02',
                      success(res) {
                        self.getList({
                            latitude: res.latitude,
                            longitude: res.longitude
                        });
                      }
                    })
                  },
                  fail(){
                    console.log("用户已经拒绝位置授权");
                    self.openConfirm();//如果拒绝，在这里进行再次获取授权的操作
                  }
                })
              } else {
                wx.getLocation({
                  type: 'gcj02',
                  success(res) {                  
                    self.getList({
                        latitude: res.latitude,
                        longitude: res.longitude
                    });
                  }
                })
      
              }
          }
        })
 
    },
    getList(location){
      const _this = this;
      // 调用接口
      // qqmapsdk.search({
      //   keyword: category, //搜索关键词
      //   location: {
      //     latitude: location.latitude,
      //     longitude: location.longitude
      //   }, //设置周边搜索中心点
      //   page_size: 20,
      //   orderby: 'star',
      //   success: function (res) { //搜索成功后的回调
      //     var mks = []
      //     for (var i = 0; i < res.data.length; i++) {
      //       mks.push({ // 获取返回结果，放到mks数组中
      //         title: res.data[i].title,
      //         id: res.data[i].id,
      //         latitude: res.data[i].location.lat,
      //         longitude: res.data[i].location.lng,
      //         iconPath: "/resources/my_marker.png", //图标路径
      //         width: 20,
      //         height: 20,
      //         tel: res.data[i].tel,
      //         address: res.data[i].address,
      //         distance: res.data[i]._distance
      //       })
      //     }
      //     _this.setData({ //设置markers属性，将搜索结果显示在地图中
      //       nerbyFoods: mks.map(i=>i.title),
      //       mks: mks
      //     })
      //   },
      //   fail: function (res) {
      //     console.log(res);
      //   },
      //   complete: function (res) {
      //     console.log(res);
      //   }
      // });

    },
    toggleModal(){
      const { status, showModal} = this.data;
      if( status === 'start'){
          return;
      }
      this.setData({
        showModal: !showModal
      })
    },
    switchtoEle(e){
      const { result } = this.data;
        wx.navigateToMiniProgram({
            appId: 'wxece3a9a4c82f58c9',
            path: `pages/sharePid/web/index?scene=https%3A%2F%2Ftb.ele.me%2Fwow%2Fz%2Fele-ad%2Fssr%2Fadsearch%3Fspm%3Da2ogi.20933402.search.1%26spm-url%3Da2ogi.20933402.search.1%26activityIdentity%3DTAOKE_WECHAT_NEW_SEARCH%26result%3D%257B%257D%26meta%3D%257B%2522resultListPath%2522%253A%2522.%2522%257D%26directE%3D-s029EVRX74mfqpbXCIbiT4HLbAgwKUU4ZaqhZ1SHgthdTBDolXtS1tI7uF4BIhjHI5KddWxMhadguwZotOdcSWCovFv25DuALj4VFCbiPHsGjMno9kzIJ4hzN7Paf1MCwUyJk5MLLRx4B5RrJWldNiZ3lLpEAnXcSh4J074vx7XVAfXCdjFt0i1T8VAymApPELraxZlNo4Rh13T9f61EbhAgnjg0zSbOEY7wfMlvjyuylCOjNRGjbNNnzQPstQrAS1EvttgyU7FgDRiRhhd7uuaFec1hTcYaTWrKU25wGCCVikNaP30DKYdGTJyHwirL3zIBtwdd1FZm2eIJfPm2wT8Qq4elMs50dqTbnmfpoGOvGAvuLkPtIgwdfZcEW3ACvhCwV1cXZtalYvCdlQQBUMZs3yALclg26Q3gar6GHUQ3nEWnMLAS4hPQeb4R%26unionLens%3DlensId%25253AAPP%2525401647444317%2525402107f9b4_087d_17f93555357_0414%25254001%25253BeventPageId%25253A20150318020002192%26pid%3Dmm_2465640171_2590750365_111933000349%26es%3DNg5i1f%25252F9%25252F9Vt3vqbdXnGlk%25252BUfz9f9P2yJ9NdXOqx%25252BSwDdyxS9Plm%25252FEsi1ev%25252BwNDodB%25252BT0uY9FVs%25253D%26udf_temp_store%3D%257B%257D%26lensId%3DOPT%25401647757284%25402132a594_087b_17fa5fcd416_c8a3%254001%26scene%3DRAdEiZu%26alsc_exsrc%3DES0000008947~~shortCode~RAdEiZu%26ruleKey%3DWECHAT_MINIPROGRAM_LAYOUT%26trackMap%3D%257B%2522bucketId%2522%253A%2522290724%2522%257D%26ruleBranch%3D130003-290724&startTime=1647757287340`
          })
    },
    switchtoMeit(){
      const { result } = this.data;
      wx.navigateToMiniProgram({
        appId: 'wx2c348cf579062e56',
        path: `/packages/index/search/search?keyword=${result}`
        })
    },
    toPacket(){
      wx.navigateTo({
        url: '../packet/packet',
      })
    },
    gotoMap(){
      const { location, result} = this.data;
      wx.openLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.title,
        address: `距离${location.distance}米 ${location.address}`,
        success: function(res){
          
        }
      })
    }
    
})