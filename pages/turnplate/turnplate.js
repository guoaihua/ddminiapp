// pages/turnplate/turnplate.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "点击按钮转盘开始，你可以给转盘命名",
            start: "大转盘"
        },
        showDefault:true,
        turnsrc: '/imges/turnplate/turn1.png',
        turnplatelist: [
            {
               id:0,
               name: '周杰伦'
            },{
                id:1,
                name: '林俊杰'
            },{
                id:2,
                name: '陈小春'
            }
        ],
        pending: false
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
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%", ease: 'ease-in-out'}
        ],300,function(){

        }.bind(this))
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
        if(this.data.pending){
            return;
        }
        var self = this;

        this.clearAnimation('.turn_default')

        var base = 360 / this.data.turnplatelist.length; //间隔
        var random = Math.floor(Math.random()*2+1);
    
        var targetRotate = base*random + base/2; // 间隔的角度

        console.log(random,targetRotate);

        this.setData({
            pending: true
        })

        

        this.animate('.turn_default',[
            {rotate: 0,ease:'ease-in-out'},
            {rotate:360*10+targetRotate,ease:'ease-in-out'}
        ],5000,()=>{
            var arr = this.data.turnplatelist;
            arr[random]['status'] = 'checked';
            this.setData({
                turnplatelist:arr
            })
            setTimeout(()=>{
                arr[random]['status'] = '';
                this.setData({
                    turnplatelist:arr,
                    pending: false
                })
            },2000)
        });

    }
})