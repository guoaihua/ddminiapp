// pages/coin/coin.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "点击按钮开始抛硬币",
            start: "抛硬币"
        },
        answer: "",
        imgsrc: "",
        showDefault: true,
        coin_animation: '',
        showRight:  false,
        showReverse: false,
        gifsrc:{
            right: "https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/coin_reverse.png?sign=d847d42107a49b2e4387eb315736cb01&t=1601302492",
            reverse: "https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/coin_right.png?sign=99288f983d4642c5108e0f0fb56e9db8&t=1601302527"
        },
        coinsrc: 'https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/coin.mp3?sign=c661749d7e41cb10bad23eebced05dda',
        
        gifpools: {

        },
        lastanswer: '',
        pending: false
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
        this.animate('#cont',[
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%",ease: 'ease-in-out'}
        ],300,function(){

        }.bind(this))

        if (options?.origin) {
            this.setData({
                origin: options?.origin
            })
        }

        //下载音频

        if(App.globalData.config.useVoice){
            this.videoContext = wx.createVideoContext('myVideo');
            self.audioctx = wx.createInnerAudioContext();
            self.audioctx.src = this.data.coinsrc;
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
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            imageUrl: '/imges/share-home.png'
        }
    },
    onShareTimeline() {
        return {
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            query: 'origin=coin',
            imageUrl: '/imges/share-home.png'
        }
    },
    vibrateLong(){
       this.data.config.useShake && wx.vibrateLong();
    },
    vibrateShort() {
       this.data.config.useShake && wx.vibrateShort();
    },
    clickbtn(){
        if(this.data.pending){
            return;
        }
        this.setData({
            showRight: false,
            showReverse: false
        })

        // 点击成功时，给一个短震动

        this.data.config.useShake &&  this.vibrateShort();

        // 生成随机数
        const self = this;
        var random = Math.floor(Math.random(0,1)*10);

        var answer = "";
       
  
        if(random>=5){
            answer ="right";
            this.setData({
                showRight: false,
                showReverse: true
            })
        }else {
            answer = "reverse";
            this.setData({
                showRight: true,
                showReverse: false
            })
        }
  

        // 将状态设置为pending，防止重复点击
        this.setData({
            pending: true,
            showDefault: false,
            answer: '',
            lastanswer: answer
        });

      this.audioctx && this.audioctx.play();

        setTimeout(function(){
            self.setData({
                animation: 'showanimate',
                answer: answer === 'right'? '正': '反',
                pending: false
            });
            self.vibrateLong();
        },1500)
    }
})
