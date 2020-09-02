// random/random/random.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "设置参数后，点击按钮生成随机数",
            start: "随机数生成"
        },
        rank1: 1,
        rank2: 10,
        rank3: 3,
        ranklist: ['?','?','?'],
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
    bindKeyInput: function (e) {
        var name = e.currentTarget.dataset.id;

        if(name === 'rank3'){
            var ranklist = new Array(+e.detail.value).fill('?');
            this.setData({
                ranklist:ranklist
            })
        }
        this.setData({
            [name]: +e.detail.value
        })
      },
      clickbtn:function(){
        if(this.data.pending){
            return;
        }
          var start = this.data.rank1;
          var end = this.data.rank2;
          var arr = this.data.ranklist;
         console.log(arr);
         arr.forEach((item,index)=>{
            arr[index] = this.getRandomArbitrary(start,end);
         });

         this.setData({
             ranklist:arr
         })

      },
     getRandomArbitrary:function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
})