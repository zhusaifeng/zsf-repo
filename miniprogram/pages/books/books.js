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

    scanBtnOnClick: function (){
        wx.scanCode({
            success (res) {
            console.log(res);
            // 使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串
            var msg = JSON.stringify(res.result);
            if (res.result) {
                wx.request({
                url:
                    getApp().globalData.url +
                    'api-book-book-bybookNumber/' +
                    res.result,
                data: {},
                method: 'GET',
                success: function (res) {
                    console.log(res);
                    if (res.data) {
                    wx.navigateTo({
                        url:
                        '/pages/book-detail/book-detail?scanCode=1&bookId=' +
                        res.data.bookId,
                    });
                    } else {
                    wx.showToast({
                        title: '当前书籍ISBN更新，暂不外借，请联系行政人员哦',
                        icon: 'none',
                        duration: 2000,
                    });
                    }
                },
                fail: function (err) {
                    wx.showToast({
                    title: '当前书籍数据更新，暂不外借，请联系行政人员哦',
                    icon: 'none',
                    duration: 2000,
                    });
                },
                });
            }

            }
        })
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