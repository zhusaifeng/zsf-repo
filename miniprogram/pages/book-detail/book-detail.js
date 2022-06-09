// pages/book-detail/book-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: {},
        bookId: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var bookId = options.bookId;
        wx.request({
            url: getApp().globalData.url + 'api-book-book-byid/' + bookId,
            data: {},
            method: 'GET',
            success: function (res) {
                that.setData({
                    book: res.data,
                    bookId: options.id,
                });
                console.log(bookId);
            },
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