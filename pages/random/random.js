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
        ranklist: [
            {
                content:  '?',
                style: ''
            },
            {
                content:  '?',
                style: ''
            },
            {
                content:  '?',
                style: ''
            }],
        pending: false,
        result: 'https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/result.mp3?sign=4c507dd5092f036f79a96801325730ac&'
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
            if(e.detail.value>10 || e.detail.value<1){
                console.log("超出范围");
                return ;
            }
            var animation = 'animation: opacity 0.3s ease-in-out;';
        
            var ranklist = new Array(+e.detail.value).fill({
                content: "?",
                style: animation
            });
       

            this.setData({
                ranklist:ranklist
            })
        }else{
            if(e.detail.value<0 || e.detail.value>100){
                    return;
            }
        }

        this.setData({
            [name]: +e.detail.value
        })
      },
      clickbtn:function(){
          var self = this;
        if(this.data.pending){
            return;
        }
          var start = this.data.rank1;
          var end = this.data.rank2;
          var arr = this.data.ranklist;
        

         // 为了先显示？ ,后面一个个显示答案，
         setTimeout(()=>{
             for(let i = 0 ; i < arr.length; i++){
                
                 setTimeout(()=>{
                    const iac = wx.createInnerAudioContext();
                    iac.src = self.data.result;
              iac.play();

                    var animation = `animation: showanswer cubic-bezier(.02,1.04,.69,1.2) 0.3s forwards`;
                    arr[i] = {
                        content: this.getRandomArbitrary(start,end),
                        style: animation
                    }
                    
                    this.setData({
                        ranklist:arr
                    })
                    if(i === arr.length - 1){
                        this.setData({
                            pending: false
                        })
                    }
                 },i*300)
             }
         },300)

         arr.forEach((item,index)=>{
                var animation = 'animation: opacity 0.3s ease-in-out;';
                arr[index] = {
                    content: '?',
                    style: animation
                }
             });

         this.setData({
                 ranklist:arr,
                 pending: true
             })
    

      },
     getRandomArbitrary:function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
})