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
            this.animate("#headerbg",[
                {scale: [1,1],opacity:1,ease: 'ease-in-out'},
                {scale: [0.8,0.8],opacity:0,ease: 'ease-in-out'}
            ],300)
        }
    }
})
