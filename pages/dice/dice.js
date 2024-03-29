// pages/dice/dice.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "点击按钮开始掷骰子",
            start: "掷骰子"
        },
        showDefault: true,
        setdices: ['active','default','default'],
        dicnum: [{
            id: 0,
            src: '/imges/dice/dice1.png'
        }],
        cup_animation: '',
        pending: false,
        dicesrc: 'https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/dd/dice.mp3',
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
        this.animate('#cont',[
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%", ease: 'ease-in-out'}
        ],300,function(){

        }.bind(this));

        if (options?.origin) {
            this.setData({
                origin: options?.origin
            })
        }

             //下载音频
      
        if(App.globalData.config.useVoice){
            self.audioctx = wx.createInnerAudioContext();
            self.audioctx.src = this.data.dicesrc;
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
            query: 'origin=dice',
            imageUrl: '/imges/share-home.png'
        }
    },
    diceSelect(e){
        //pending 状态不可点击
        if(this.data.pending){
            return;
        }
        var index = e.currentTarget.dataset.index;
        var arr = this.data.setdices;
        var dic = [];
        if(arr[index]==='active'){
            return;
        }else {
            arr = ["default","default","default"];
            arr[index] = "active";
        }
        
        for(let i = 0; i<= index;i++){
            dic.push({
                id: i,
                src: '/imges/dice/dice1.png'
            })
        }
        this.setData({
            setdices: arr,
            dicnum: dic
        })
    },
    vibrateLong(){
        this.data.config.useShake && wx.vibrateLong();
     },
     vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
    clickbtn(e){
    
        if(this.data.pending){
            return;
        }

       this.vibrateShort();

        var self = this;
        this.setData({
            cup_animation: 'cup_animation',
            pending: true
        });

        setTimeout(()=>{
            this.audioctx && this.audioctx.play();
        },800)
       

        setTimeout(()=>{
            var arr = this.data.dicnum;
            arr.forEach((item,index)=>{
                var random = parseInt(Math.random(0,1)*6+1);
                item.src = `/imges/dice/dice${random}.png`
            });
            this.setData({
                dicnum: arr
            });
           this.vibrateLong();
        },2300)

        setTimeout(()=>{
            this.setData({
                cup_animation: '',
                pending: false
            });
        },3100);

    }
})