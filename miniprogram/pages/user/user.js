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



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.cloud.callFunction({
        //     name:'add',
        //     data:{
        //         a:1,
        //         b:3,
        //     },
        //     success:function(res){
        //         console.log(res.result.sum);
        //     }
        // })

        // wx.cloud.callFunction({
        //     name: 'login',
        //     data: {},
        //     success: (res) => {
        //     console.log(res)
        //     console.log('[云函数] [login] user openid: ', res.result.openid);
        //       // app.globalData.openid = res.result.openid

        //     },
        //     fail: (err) => {
        //     console.error('[云函数] [login] 调用失败', err);
        //     },
        // });

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