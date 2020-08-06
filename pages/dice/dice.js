// pages/dice/dice.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "点击骰子或按钮开始掷骰子",
            start: "掷骰子"
        },
        showDefault: true,
        setdices: ['active','default','default'],
        dicnum: 1
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
    diceSelect(e){
        var index = e.currentTarget.dataset.index;
        var arr = this.data.setdices;
        if(arr[index]==='active'){
            return;
        }else {
            arr = ["default","default","default"];
            arr[index] = "active";
        }
        this.setData({
            setdices: arr
        })
    }
})