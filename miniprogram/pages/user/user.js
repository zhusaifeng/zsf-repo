// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgsrc:'',
        haveImg:false
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
    url: getApp().globalData.url + 'api-user-exit',
    data: {},
    method: 'GET',
    success: (result)=>{
        wx.navigateTo({
            url: '/pages/index/index',
        });
    },
});
},

changephoto:function(){
    wx.chooseImage({
        count: 1,
        success: (result)=>{
            console.log(result);
            wx.cloud.uploadFile({
                cloudPath:'my-photo.png',
                filePath:result.tempFilePaths[0],
                success:res=>{
                    console.log(res.fileID);
                    this.setData({
                        imgsrc:res.fileID,
                        haveImg:true
                    })
                    this.onLoad();
                },
                fail:err=>{
                    console.log(errMsg);
                }
            })
        },
        fail:err=>{
            console.log(err);
        }
    });

},



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imgsrc:this.data.imgsrc,
            haveImg:this.data.haveImg
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