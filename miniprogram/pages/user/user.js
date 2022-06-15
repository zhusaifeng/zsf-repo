// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    userBorrowBtn: function() {
    wx.navigateTo({
    url: '/pages/user-borrow/user-borrow'
    })
},

userHistoryBtn:function(res){
    wx.navigateTo({
        url: '/pages/user-history/user-history',
    });
},

userSettingBtn:function(res){
    wx.navigateTo({
        url: '/pages/user-setting/user-setting',
    });

},

exitBtnOnClick:function(res){
wx.request({
    url: getApp().glabalData.url+'api-user-exit',
    data: {},
    method: 'GET',
    success: (result)=>{
        wx.navigateTo({
            url: '/pages/index/index',
        });
    },
});
},



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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