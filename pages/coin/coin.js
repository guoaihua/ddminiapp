// pages/coin/coin.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "点击硬币或按钮开始抛硬币",
            start: "抛硬币"
        },
        answer: "",
        imgsrc: "",
        showDefault: true,
        gifsrc:{
            reverse: "https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/coin_reverse.gif?sign=2054a14fe83095c723d2b6fda9d4a42f",
            right: "https://7a69-ziming-sslvb-1302777190.tcb.qcloud.la/static/coin_right.gif?sign=dbc9b8d5e8c1e2932ca2e4775d660964"
        },
        gifpools: {

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        console.log(self);
        this.setData({
              navH: App.globalData.navHeight
            })
         // showHeaderbg: false
        this.selectComponent("#header").hideheader();
        this.animate('#cont',[
         {top: "33.5%" },
         {top: "12%"},
         {top: "9.5%"}   
        ],500,function(){
        
        }.bind(this))

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
    clickbtn(){
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
        this.setData({
            showDefault: false,
            answer: '',
            imgsrc: imgpools[answer]
        });
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
            self.animate("#answer",[
                {scale:[0,0],opacity:1,rotate: -45},
                {scale:[1,1],opacity:1, rotate:0}
            ],300,function(err){
console.log(err);
            })
            self.setData({
                answer: answer === 'right'? '正': '反'
            });
        },1800) 
    }
})