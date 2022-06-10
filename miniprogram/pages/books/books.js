// pages/books/books.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyOnes: {},
    },

    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: getApp().globalData.url + 'api-book-classifyone-all',
            data: {},
            method: 'GET',
            success: function (res) {
            that.setData({
                classifyOnes: res.data,
            });
            },
            fail: ()=>{console.log("调用接口失败")},
        });
    },

    booksListBtn:function(e){
        var name=e.target.dataset.name;
        wx.navigateTo({
            url: '/pages/books-list/books-list?classifyone=' + name,
        });
    },
    changeInput:function(e){
        console.log(e);
        var search=e.detail.value;
        console.log(search);
        if(search!=''){
        wx.navigateTo({
            url:'/pages/books-search/books-search?search=' + search,
        })
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

    }
})