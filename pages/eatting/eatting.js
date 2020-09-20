// eatting/eatting/eatting.js
const App = getApp();
const foods = [
    "麻辣香锅",
    "火锅",
    "串串",
    "冒菜",
    "烧烤",
    "兰州拉面",
    "沙县小吃",
    "面食",
    "刀削面",
    "盖浇饭",
    "炒菜",
    "川菜",
    "自助餐",
    "炒面",
    "炒饭",
    "西餐",
    "牛排",
    "麦当劳",
    "肯德基",
    "水饺",
    "煎饺",
    "热干面",
    "牛肉面",
    "黄焖鸡米饭",
    "烤肉饭",
    "鸡公煲",
    "三明治",
    "饭团",
    "馄炖",
    "卤肉饭",
    "披萨",
    "日式料理",
    "沙拉",
    "炸鸡",
    "肉夹馍",
    "麻辣烫",
    "简餐盒饭",
    "粥",
    "拉面",
    "石锅拌饭",
    "烤肉",
    "咖喱饭",
    "汤饭套餐",
    "煲仔饭",
    "凉皮",
    "凉面",
    "肠粉",
    "意大利面",
    "鸡排",
    "烤鸭",
    "寿司",
    "面包",
    "汉堡",
    "米线",
    "农家菜",
    "小碗菜",
    "韩式料理",
    "湘菜",
    "大排档",
    "羊肉粉",
    "酸菜鱼",
    "鸭血粉丝",
    "烤冷面",
    "小龙虾",
    "螺蛳粉",
    "油焖大虾",
    "卤味",
    "瓦罐汤",
    "过桥米线",
    "汤包",
    "包子",
    "快餐",
    "中式快餐",
    "煎饼",
    "木桶饭",
    "牛腩煲",
    "轻食",
    "汤饭",
    "烧腊饭",
    "烤鱼",
    "麻辣拌",
    "铁板烧",
    "汉堡王",
    "蛋包饭",
    "油条",
    "三鲜面",
    "汤泡面",
    "吊锅饭",
    "卷饼",
    "锅贴",
    "花甲粉",
    "炒米粉",
    "家常菜",
    "蒸菜",
    "水果拼盘",
    "蛋糕",
    "鸡蛋灌饼",
    "油泼面",
    "手抓饼",
    "蒸饺"
  ]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game: {
            name: "叮咚决策器",
            tips: "不知道今天吃啥？点击按钮给你出出主意",
            start: "今天吃什么"
        },
        result: '麻辣香锅',
        status: 'start',
        pending: false,
        voiceSrc: 'https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/eatting.mp3?sign=1479c281e551033d5baa68a72283828b',
        result: 'https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/result.mp3?sign=39649a7924659a4c92fcea75b4df875e'
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

         if(App.globalData.config.useVoice){
            self.actx = wx.createInnerAudioContext();
            self.actx.src = this.data.voiceSrc;
    
            self.actx_result = wx.createInnerAudioContext();
            self.actx_result.src = this.data.result;
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

    },
    clickbtn(){
        var self = this;
        if(this.data.pending){
            return;
        }
        this.setData({
            status: 'ques',
            pending: true,
            ["game.start"]: '换一个'
        });
        self.actx && self.actx.play();
        setTimeout(()=>{
            var random = Math.floor(Math.random()*100);
            self.actx_result && self.actx_result.play();
            this.setData({
                status: 'answer',
                result: foods[random],
                pending: false
            });
        },2100)
    }
})