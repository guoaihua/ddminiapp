// pages/setting/setting.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        voice: {
            status: 'on',
            show: true
        },
        shake: {
            status: 'off',
            show: false
        },
        turn: {
            status: 'on',
            show: true
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        console.log(App.globalData.navHeight);
        this.setData({
              navH: App.globalData.navHeight
            })
         // showHeaderbg: false
        this.selectComponent("#header").hideheader();
        this.animate('#cont',[
         {top: "33.5%",ease: 'ease-in-out'},
         {top: "10.5%",ease: 'ease-in-out'}
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
    toggle(e){
     
        var type = e.currentTarget.dataset.type;
        var data = this.data[type];
        if(data.show){
            data.show = false;
            data.status = 'off';
        }else{
            data.show = true;
            data.status = 'on';
        }
        this.setData({
            [type]: data
        })
    }
})