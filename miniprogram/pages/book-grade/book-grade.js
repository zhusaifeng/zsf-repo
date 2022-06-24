// pages/book-grade/book-grade.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        star: ["/images/star/star_1.png", "/images/star/star_0.png", "/images/star/star_0.png", "/images/star/star_0.png", "/images/star/star_0.png"],
        grade:1,
        borrowId:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        console.log("还书时查看borrowId")
        console.log(options)
        that.setData({borrowId: options.borrowId});
    },

    onClick: function(e) {
        var that = this;
        var id = e.currentTarget.id;
        var starArr = [];
        for (var i = 0; i < id; ++i) {
        starArr[i] = "/images/star/star_1.png";
        }
        for (var i = id; i < 5; ++i) {
        starArr[i] = "/images/star/star_0.png";
        }
        this.setData({star: starArr, grade: id});
    },

    submitGrade: function() {
        var that = this;
        var credit = getApp().globalData.user.userCredit;
        if (credit <= 98) {
        getApp().globalData.user.userCredit += 2;
        } else {
        getApp().globalData.user.userCredit = 100;
        }
        wx.request({
        url: getApp().globalData.url + 'api-scan-grade-book/' + that.data.borrowId +  '/' + that.data.grade,
        data: {},
        method: 'GET',
        success: function (res) {
            wx.switchTab({
            url: '/pages/user/user'
            })
        }
        })
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