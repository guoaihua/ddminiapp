// sport/sport/sport.js

const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "纠结今天运不运动？点击按钮帮你做决定",
            start: "今天运动吗",
            sport: '运动',
            rest: '休息',
            result_sport: '今天运动一下吧',
            result_rest: '今天就休息一下吧'
        },
        animate: '',
        disable: false,
        sportVoice: 'https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/dd/sport.mp3'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
    
        this.setData({
              navH: App.globalData.navHeight,
              config: App.globalData.config
            })
         // showHeaderbg: false
        this.selectComponent("#header").hideheader();

        if (options?.origin) {
            this.setData({
                origin: options?.origin
            })
        }
        this.animate('#cont',[
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%", ease: 'ease-in-out'}
        ],300,function(){

        }.bind(this))
        
        try{
           var sport =  wx.getStorageSync('usesport');
           if(sport){
              var time = new Date(sport.time);
              var now = new Date();
              var isSameDay = this.isSameDay(time, now);
              if(isSameDay){
                // 上一次缓存是同一天说明今天已经选择过了
              
                var animate = '';
                if(sport.sport === 'sport'){
                    animate = 'showsport'
                }else {
                    animate = 'showrest'
                }

                this.setData({
                    disable: true,
                    ["game.start"]: "一天只能选择一次哦",
                    animate:animate
                })
              }
           }
        }catch(e){

        }

        if(App.globalData.config.useVoice) {
            self.actx = wx.createInnerAudioContext();
            self.actx.src = this.data.sportVoice;
        }


    },

    isSameDay(timeStampA, timeStampB) {
    let dateA = new Date(timeStampA);
    let dateB = new Date(timeStampB);
    return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
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
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            imageUrl: '/imges/share-home.png'
        }
    },
    onShareTimeline() {
        return {
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            query: 'origin=sport',
            imageUrl: '/imges/share-home.png'
        }
    },
    vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
     vibrateLong(){
        this.data.config.useShake && wx.vibrateLong();
     },
    clickbtn(){
        if(this.data.disable){
            return;
        }
        
        var config = App.globalData.config;
        var rate = config.sportRatio || '6:5';
        var rate1 = +rate.split(":")[0];
        var rate2 = +rate.split(":")[1];

        var random = Math.floor(Math.random()*(rate1 + rate2));

        var animate = random < rate1 ? 'sport' : 'rest';

        this.vibrateShort();
        this.actx && this.actx.play();
        this.setData({
            animate: animate,
            ["game.start"]: "一天只能选择一次哦",
            disable: true
        });
        
        setTimeout(()=>{
            this.vibrateLong();
        },3000)
        // 设置缓存
        wx.setStorageSync('usesport', {
            time: Date.now(),
            sport: animate
        } );
    }
})