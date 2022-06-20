// pages/user-history/user-history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        history:{},

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        var userId=getApp().globalData.user.userId;
        wx.request({
            url: getApp().globalData.url + 'api-scan-borrow-history/' + userId,
            data: {},
            method: 'GET',
            success: (res)=>{
                var data=res.data;
                for(var i=0;i<data.length;++i){
                     //借书时间
                    data[i].borrowStartTime = new Date(data[i].borrowStartTime);
                    var mydate = data[i].borrowStartTime.getFullYear() + "-" + (data[i].borrowStartTime.getMonth() + 1) + "-" + data[i].borrowStartTime.getDate();
                    data[i].borrowStartTime = mydate;
                    //还书时间
                    data[i].borrowEndTime = new Date(data[i].borrowEndTime);
                    var mydate2 = data[i].borrowEndTime.getFullYear() + "-" + (data[i].borrowEndTime.getMonth() + 1) + "-" + data[i].borrowEndTime.getDate();
                    data[i].borrowEndTime = mydate2;
                }
                data.reverse();
                that.setData({history: data});
                console.log(data);
            },
            fail: ()=>{},
            complete: ()=>{}
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