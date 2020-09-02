// pages/setting/setting.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        voice: {
            status: 'on',
            show:true
        },
        shake: {
            status: 'on',
            show: true
        },
        turn: {
            status: 'on',
            show: true
        },
        checkboxItems: [
            {name: '5:5', checked: false},
            {name: '6:5',  checked: true},
            {name: '7:5', checked: false}
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        const config = App.globalData.config;
        
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

        if(!config){
            return;
        }
 
        var items = this.data.checkboxItems
        items.forEach((item,index)=>{
            console.log(item.name, config.sportRatio);
            if(item.name === config.sportRatio){
                item.checked = true
            }else {
                item.checked = false
            }
        });

        this.setData({
              checkboxItems: items,
              voice: {
                status: config.useVoice ? 'on': 'off',
                show: config.useVoice
            },
            shake: {
                status: config.useShake ? 'on': 'off',
                show: config.useShake
            },
            turn: {
                status: config.useCache ? 'on': 'off',
                show: config.useCache
            }
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
    save(){
    // 每次设置页面时，将数据存入缓存
    var useVoice = this.data.voice.show;
    var useShake = this.data.shake.show;
    var useCache = this.data.turn.show;
    var sportRatio = this.data.checkboxItems.filter((item)=>item.checked)[0].name;

    var data =  {
        useVoice:useVoice,
        useShake:useShake,
        useCache:useCache,
        sportRatio:sportRatio
      }

    wx.setStorage({
      data:data,
      key: 'config'
    });
    // 同时将数据实时更新到全局
    App.globalData.config = data;
    console.log( App.globalData.config);
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
        });
        this.save();
    },
    setSports(e){
        console.log(e);
        var cur = e.currentTarget.dataset.index;
        var checkboxItems = this.data.checkboxItems;

        checkboxItems.forEach((item,index)=>{
            if(cur === index){
                item['checked'] = true;
            }else {
                item['checked'] = false;
            }
        });

        this.setData({
            checkboxItems: checkboxItems
        });
        this.save();
    }
})
