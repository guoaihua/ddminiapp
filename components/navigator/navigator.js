// components/navigator.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navH: String
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
            wx.navigateBack()
        }
    }
})
