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
            name: '周杰伦'
        }, {
            id: 1,
            name: '林俊杰'
        }, {
            id: 2,
            name: '陈小春'
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
        turnlength: 3
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

        this.setTurn(this.data.turnlength);
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
    clickbtn() {
        if (this.data.pending) {
            return;
        }
        var self = this;

        this.clearAnimation('.turn_default')

        var base = 360 / this.data.turnplatelist.length; //间隔
        var random = Math.floor(Math.random() * 2 + 1);

        var targetRotate = base * random + base / 2; // 间隔的角度

        console.log(random, targetRotate);

        this.setData({
            pending: true
        })



        this.animate('.turn_default', [{
                rotate: 0,
                ease: 'ease-in-out'
            },
            {
                rotate: 360 * 10 + targetRotate,
                ease: 'ease-in-out'
            }
        ], 5000, () => {
            var arr = this.data.turnplatelist;
            arr[random]['status'] = 'checked';
            this.setData({
                turnplatelist: arr
            })
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

        var self = this;
        var index = e.currentTarget.dataset.id;

        var editlist = self.data.editlist;

        if (editlist[index]['class'] === 'active') {
            return;
        }
        //设置转盘
        self.setTurn(editlist[index]['id']);

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
            console.log(locallist);
            if(locallist){
                this.setData({
                    turnplatelist: locallist
                })
            }
          } catch (e) {
            // Do something when catch error
          }

    },
    editurn() {
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
        console.log(temp);
        self.setData({
            showModal: true,
            templist: temp,
            templist2: temp
        })
    },
    cancel() {
        this.setData({
            showModal: false
        })
    },
    confirm() {

        var temp = this.data.templist2;
        console.log(temp);

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
        console.log(e)
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