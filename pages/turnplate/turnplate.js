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
        showDefault: true,
        turnsrc: '/imges/turnplate/turn1.png',
        turnplatelist: [{
            id: 0,
            name: '转盘1'
        }, {
            id: 1,
            name: '转盘2'
        }, {
            id: 2,
            name: '转盘3'
        }],
        templist: [],
        templist2: [],
        pending: false,
        editlist: [{
                id: 3,
                class: 'active'
            },
            {
                id: 4,
                class: ''
            },
            {
                id: 5,
                class: ''
            },
            {
                id: 6,
                class: ''
            }
        ],
        showModal: false,
        turnlength: 3,
        anima_scale: '',
        turnaudio: 'https://7a69-ziming-patwj-1303043907.tcb.qcloud.la/static/turn.mp3?sign=497ada0be8bb98dedc2adca2bed2aa7a'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
      
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
        this.animate('#cont', [{
                top: "33.5%",
                ease: 'ease-in-out'
            },
            {
                top: "10.5%",
                ease: 'ease-in-out'
            }
        ], 300, function () {

        }.bind(this));

       for(var i=3; i < 7;i++){
        if(!this.data.config.useCache){
             try {
                 
                 wx.removeStorageSync(`turn-${i}`)
             }catch(e){}
        }
    }

        this.setTurn(this.data.turnlength);

        if(App.globalData.config.useVoice){
            this.actx_turn =  wx.createInnerAudioContext();
            this.actx_turn.src = this.data.turnaudio;
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
       this.actx_turn && this.actx_turn.stop();
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
            query: 'origin=turnplate',
            imageUrl: '/imges/share-home.png'
        }
    },
    vibrateLong(){
        this.data.config.useShake && wx.vibrateLong();
     },
     vibrateShort() {
        this.data.config.useShake && wx.vibrateShort();
     },
    clearAnimate:function(){
        this.clearAnimation(".turn_default")
    },
    clickbtn() {
        if (this.data.pending) {
            return;
        }
        var self = this;
        this.clearAnimate();
        this.clearAnimation('.turn_default')
        
    
        var turnlength = this.data.turnlength
        // 根据turnlength 确认转盘个数
        var base = 360 / turnlength; //间隔
        var random = Math.floor(Math.random() * turnlength); // 0 - length-1
    
        var targetRotate = base * random + base / 2; // 间隔的角度


        this.setData({
            pending: true
        });

        this.vibrateShort();
        this.actx_turn && this.actx_turn.play();

        this.animate('.turn_default', [{
                rotate: 0,
                ease: 'ease-in-out'
            },
            {
                rotate: 360 * 11 + targetRotate,
                ease: 'ease-in-out'
            }
        ], 5200, () => {
            var arr = this.data.turnplatelist;
        
            arr[random]['status'] = 'checked_' + turnlength;
    
            this.setData({
                turnplatelist: arr
            })
            this.vibrateLong();
            setTimeout(() => {
                arr[random]['status'] = '';
                this.setData({
                    turnplatelist: arr,
                    pending: false
                })
            }, 2000)
        });

    },

    selectTurn(e) {

        if (this.data.pending) {
            return;
        }

        // 清楚样式
        this.clearAnimate();

        var self = this;
        var index = e.currentTarget.dataset.id;
        var editlist = self.data.editlist;

        var turnplatelist = [];

        if (editlist[index]['class'] === 'active') {
            return;
        }
        //设置转盘
        var setTurn = self.setTurn(editlist[index]['id']);
        if(!setTurn){
            // 不存在缓存设置失败，自定义轮盘
            for(var i = 0; i < editlist[index]['id'];i++){
                turnplatelist.push({
                    id: i,
                    name: '转盘' + (i +1) 
                })
            }
            this.setData({
                turnplatelist:turnplatelist
            })
        }

        this.animate('.turn_default',[
            {scale: [1,1],ease: 'cubic-bezier(.02,1.04,.69,1.2)'},
            {scale: [1.05,1.05],ease: 'cubic-bezier(.02,1.04,.69,1.2)'},
            {scale: [1,1],ease: 'cubic-bezier(.02,1.04,.69,1.2)'}
        ],300,()=>{
            this.clearAnimation(".turn_default");
        });
        this.animate('.turn_bg',[
            {scale: [1,1],ease: 'cubic-bezier(.02,1.04,.69,1.2)'},
            {scale: [1.05,1.05],ease: 'cubic-bezier(.02,1.04,.69,1.2)'},
            {scale: [1,1],ease: 'cubic-bezier(.02,1.04,.69,1.2)'}
        ],300,()=>{
            this.clearAnimation(".turn_bg");
        })

        editlist.forEach((item, i) => {
            if (index === i) {
                item.class = 'active';
            } else {
                item.class = '';
            }
        });

        // 数量id为真实长度
        self.setData({
            editlist: editlist,
            turnlength: editlist[index]['id']
        })

    },
    setTurn(index){
        //点击切换时，先从缓存拉取数据
        try {
            var locallist = wx.getStorageSync('turn-'+ index);
           
            if(locallist){
                this.setData({
                    turnplatelist: locallist
                })
                return true
            }
            return false;
          } catch (e) {
            // Do something when catch error
            return false;
          }

    },

    getTurn(index){
    
    },
    editurn() {
        if (this.data.pending) {
            return;
        }
        var self = this;
        var temp = self.data.templist
        var turnlength = self.data.turnlength
        // 根据index 创建list长度
        for (var i = 0; i < turnlength; i++) {
            temp.push({
                id: i,
                name: '转盘' + (i + 1)
            })

        }

        self.setData({
            showModal: true,
            templist: temp,
            templist2: temp
        })
    },
    cancel() {
        this.setData({
            showModal: false,
            templist2: [],
            templist: [],
        })
    },
    confirm() {

        var temp = this.data.templist2;
    

        // 将数据缓存到本地

        wx.setStorage({
          data: temp,
          key: 'turn-'+this.data.turnlength
        })

        // 确认临时存储
        this.setData({
            turnplatelist: temp,
            templist2: [],
            templist: [],
            showModal: false
        })
    },
    bindKeyInput(e) {
    
        var value = e.detail.value;
        var id = e.currentTarget.dataset.id;
        var temp = this.data.templist2;
        temp[id]['name'] = value;

        // 临时存储
        this.setData({
            templist2: temp
        })
    }
})