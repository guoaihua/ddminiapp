// components/navigator.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navH: String,
        origin: String
    },

    

    /**
     * 组件的初始数据
     */
    data: {
        title: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        navBack(){
            if (this.data.origin) {
                wx.navigateTo({
                    url: '../../pages/index/index',
                })
            } else {
                wx.navigateBack()
          }
        }
    }
})
