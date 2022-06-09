// pages/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotBookList: {},
        recommendBookList: {},
        newBookList: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //获取热门图书
        wx.request({
            url: getApp().globalData.url + 'api-index-getHotBook',
            data: {},
            method: 'GET',
            success: function (res) {
                that.setData({
                    hotBookList: res.data
                });
                console.log(res.data);
            }
        });

        //获取推荐图书
        wx.request({
            url: getApp().globalData.url + 'api-index-getRecommendBook/' + 1,
            data: {},
            method: 'GET',
            success: function (res) {
                that.setData({
                    recommendBookList: res.data
                });
            }
        })
        //获取新书
        wx.request({
            url: getApp().globalData.url + 'api-index-getNewBook',
            data: {},
            method: 'GET',
            success: function (res) {
                that.setData({
                    newBookList: res.data
                });
            }
        })
    },

    bookDetailBtn: function (e) {
        var bookId = e.currentTarget.id;
        wx.navigateTo({
            url: '/pages/book-detail/book-detail?scanCode=0&bookId=' + bookId
        })
        // console.log(bookId);
    },

    bookDetailBtn2: function (e) {
        console.log(e,"=====e");
        var bookId = e.currentTarget.id;
        console.log(bookId);
        wx.navigateTo({
            url: '/pages/book-detail/book-detail?scanCode=0&bookId=' + bookId
        })
        // console.log(bookId);
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