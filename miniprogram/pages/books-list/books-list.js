// pages/books-list/books-list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var classifyOne = options.classifyone;
        var that = this;
        wx.showNavigationBarLoading();
        wx.request({
        url: getApp().globalData.url + 'api-book-book-byclassifyone/' + classifyOne,
        data: {},
        method: 'GET',
        success: function(res){
            that.setData({books: res.data});
        }
        })
        wx.hideNavigationBarLoading();
    },

    bookDetailBtn:function(e){
        var bookId=e.currentTarget.id;
        wx.navigateTo({
            url: '/pages/book-detail/book-detail?scanCode=0&bookId=' + bookId,
        });
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