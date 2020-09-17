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
        gifsrc:{
            reverse: "https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/coin_reverse.gif?sign=2054a14fe83095c723d2b6fda9d4a42f",
            right: "https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/coin_right.gif?sign=dbc9b8d5e8c1e2932ca2e4775d660964"
        },
        coinsrc: 'https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/coin.mp3?sign=ee2c2e669b1a375777f6a3c9d80f8f49',
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
        console.log(App.globalData.navHeight);

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


        //下载音频
        this.audioctx = App.globalData.config.useVoice && wx.createAudioContext('myAudio');

        // 预先下载2张gif
       self.loader = this.selectComponent("#imgloader");
       let gifsrc = self.data.gifsrc;
       Object.keys(gifsrc).forEach((item,index)=>{
         self.loader.load(gifsrc[item] +"&t="+ new Date().getTime(),(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            self.data.gifpools[item] = data.src
         })
       })
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

        // 点击成功时，给一个短震动

        this.vibrateShort();

        // 生成随机数
        const self = this;
        var random = Math.random(0,1);

        var answer = "";
        answer = random > 0.5 ? "right" : "reverse";
        var imgpools = self.data.gifpools;
        if(!imgpools[answer]){
            wx.showToast({
              title: '糟糕，网络错误，请再试一次'
            })
            return;
        }
        // 将状态设置为pending，防止重复点击
        this.setData({
            pending: true,
            showDefault: false,
            answer: '',
            imgsrc: imgpools[answer],
            lastanswer: answer
        });
     
        this.audioctx && this.audioctx.play();

        // 用完之后删除，加载下一个新的
        self.data.gifpools[answer] = null;

        self.loader.load(self.data.gifsrc[answer] +"&t="+ new Date().getTime(),(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            self.data.gifpools[answer] = data.src
        })

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
