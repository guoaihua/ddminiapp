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

        if (options?.origin) {
            this.setData({
                origin: options?.origin
            })
        }
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
        return {
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            imageUrl: '/imges/share-home.png'
        }
    },
    onShareTimeline() {
        return {
            title: '不要纠结啦，叮咚决策器帮你做决定!',
            query: 'origin=random',
            imageUrl: '/imges/share-home.png'
        }
    },
    vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
    bindKeyInput: function (e) {
        var name = e.currentTarget.dataset.id;

        if(name === 'rank3'){
            if(e.detail.value>10 || e.detail.value<1){
                console.log("超出范围");
                wx.showToast({
                    title: '请按提示填写数字',
                    icon: 'none',
                    duration: 2000
                  })
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
                wx.showToast({
                    title: '请按提示填写数字',
                    icon: 'none',
                    duration: 2000
                  })
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

          var temp = [];
        // 判断是否超出范围

        if(start >= end){
            wx.showToast({
                title: '请按提示填写数字',
                icon: 'none',
                duration: 2000
              })
              return;
        }
        if((end - start + 1) < this.data.rank3){
            console.log(end - start + 1,  this.data.rank3);
            wx.showToast({
              title: '请按提示填写数字',
              icon: 'none',
              duration: 2000
            })
            return;
        }


          this.vibrateShort();
         // 为了先显示？ ,后面一个个显示答案，
         setTimeout(()=>{
             for(let i = 0 ; i < arr.length; i++){

                 setTimeout(()=>{
                     if(App.globalData.config.useVoice){
                        const iac = wx.createInnerAudioContext();
                        iac.src = self.data.result;
                        iac.play();
                     }


                    var animation = `animation: showanswer cubic-bezier(0,.77,.67,1.43) 0.3s forwards`;
                    arr[i] = {
                        content: this.getUniqueNumber(temp,start,end),
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
      getUniqueNumber(arr,min,max){
            var random =  this.getRandomArbitrary(min,max);
            while(arr.indexOf(random) > -1){
                random = this.getRandomArbitrary(min,max);
            }
            arr.push(random);
            return random;
      },
     getRandomArbitrary:function(min, max) {
        return Math.floor(Math.random() * (max - min+1) + min);
      }
})
