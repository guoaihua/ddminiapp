// components/header/header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showHeaderbg:{
            type:Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hideheader(){
            console.log(111);
            this.animate("#headerbg",[
                {scale: [1,1],opacity:1},
                {scale: [0.6,0.6],opacity:0}
            ],300)
        }
    }
})
