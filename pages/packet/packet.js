// random/random/random.js
const App = getApp();
import { ele_take_out, mt_take_out,ele_fruits_take_out } from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "天天领红包",
            tips: "先领红包再点外卖",
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        console.log(self);
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
    vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
     handleElePacket(){
      wx.navigateToMiniProgram(ele_take_out)
     },
     handleEleFruits(){
      wx.navigateToMiniProgram(ele_fruits_take_out)
     },
     handleMtacket(){
      wx.navigateToMiniProgram(mt_take_out)
     },


})
