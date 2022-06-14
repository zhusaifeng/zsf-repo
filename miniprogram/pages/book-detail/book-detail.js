
// pages/book-detail/book-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: {},
        bookId: 0,
        scanCode: 0,
        show: true,
        animated: true,
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
                    bookId: options.bookId,
                });
            },
        });
        var that = this;
        if (options.scanCode == 1) {
        this.setData({
            scanCode: 1,
        });
        }
    },

    scanBtnOnClick:function(){
    wx.scanCode({
    success:function(res){
        var msg=JSON.stringify(res.result);
        if (!!res.result){
            wx.request({
                url:getApp().globalData.url +
                'api-book-book-bybookNumber/' +
                res.result,
                data: {},
                method: 'GET',
                success:function(res){
                if(!!res.data){
                    wx.navigateTo({
                        url: '/pages/book-detail/book-detail?scanCode=1&bookId=' +
                        res.data.bookId,
                        success: (result)=>{
                        },
                    });
                }
                else {
                    wx.showToast({
                    title: '当前书籍ISBN更新中，暂不外借，请联系行政人员哦',
                    icon: 'none',
                    duration: 2000,
                    });
                }
                },
                fail: function (err) {
                    wx.showToast({
                    title: '当前书籍数据更新中，暂不外借，请联系行政人员哦',
                    icon: 'none',
                    duration: 2000,
                    });
                },
            })
        }
    }
    });
    },
    borrowBtn:function(event){
        var that=this;
        var userId=getApp().globalData.user.userId;
        // var userId=1327;
        var userCredit=getApp().globalData.user.userCredit;
        that.setData({
            show:true,
            animated:true,
        });
        wx.request({
            url: getApp().globalData.url + 'api-scan-borrowed-byuserid/' + userId,
            data: {},
            method: 'GET',
            success: function (res) {
            console.log("接口调用成功");
            console.log(res.data.length)
            debugger
            wx.requestSubscribeMessage({
                        tmplIds:[
                            'NvcQPI8FErNTWUXm1FptE4YnUb1c1h0D87hugXXwdus',
                            'rKeBG_kEKmjwp5vF8fq4gfDuD8bA8omhQNWtcJqEpaY',
                            'DJefR0odTDiIr-0DsJSmV4AayQvJ4fNFZAOjPKKXD-I',
                        ],
                        success(res){
                            console.log(res);
                        }
                    })
        }
        })
    },

    subsribe:function(res){
        console.log(res);
        console.log("点击添加订阅")
        debugger
        wx.requestSubscribeMessage({
            tmplIds:['jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY'],
            success(res){
                console.log("订阅");
                if(res['jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQ'=='accept']){
                    wx.cloud.callFunction({
                        name:'template',
                        data:{
                            bookname:'平凡的世界',
                            borrowpeople:'朱赛峰',
                            returntime:2022-6-14,
                        },
                        success(res){
                            console.log(res);
                        },
                        fail(res){
                            console.log("云函数调用失败")
                        }

                    })
                }
            },
            fail(res){
                console.log("订阅失败")
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