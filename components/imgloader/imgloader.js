// components/imgloader/imgloader.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgInfo:{}, // 保存图片信息，以src为key
        callbacks:{}, // 回调函数队列
        imgLoadList: [] // 下载队列
    },

    /**
     * 组件的方法列表
     */
    methods: {
        imgLoad(e){
            let src = e.currentTarget.dataset.src,
            width = e.detail.width,
            height = e.detail.height
        //记录已下载图片的尺寸信息
        this.data.imgInfo[src] = { width, height }
        this._removeFromLoadList(src)
        this._runCallback(null, { src, width, height })
        },
        imgFail(e){
            let src = e.currentTarget.dataset.src
            this._removeFromLoadList(src)
            this._runCallback('Loading failed', { src })
        },
            //将图片从下载队列中移除
        _removeFromLoadList(src) {
            let list = this.data.imgLoadList
            list.splice(list.indexOf(src), 1)
            this.setData({ 'imgLoadList': list })
        },
        load(src, callback){
            const self = this;
            if(!src){
                return;
            }
            let list = self.data.imgLoadList;
            let imgInfo = self.data.imgInfo[src];
            if(callback){
                self.data.callbacks[src] = callback
            }
            if(imgInfo){
                self._runCallback(null, {
                    src: src,
                    width: imgInfo.width,
                    height: imgInfo.height
                })
            }else{
                list.push(src);
                self.setData({
                    imgLoadList: list
                })
            }
        },
        _runCallback(err,data){
            let callback = this.data.callbacks[data.src];
            callback(err,data);
            delete this.data.callbacks[data.src]
        }
    }
})
