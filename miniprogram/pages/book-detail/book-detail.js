
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
        borrowId:0,
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
        var bookId = event.currentTarget.id;
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
            wx.requestSubscribeMessage({
                        tmplIds:[
                            'jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY'
                        ],
                        success(res){
                            console.log(res);
                            if (res.jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY == 'accept') {
                                wx.request({
                                    url:
                                    getApp().globalData.url +
                                    'api-scan-borrow-book/' +
                                    userId +
                                    '/' +
                                    bookId,
                                    data: {},
                                    method: 'GET',
                                    success: function (res) {
                                    if(res.data!='-1'){
                                        that.setData({
                                            borrowId:res.data,
                                        })
                                        that.acceptBorrow(res.data);
                                    }
                                    else if(res.data=='-1'){
                                        that.setData({
                                            show:false,
                                            animated:false,
                                        })
                                        wx.showToast({
                                            title:'当前书籍已被借阅',
                                            icon:'error',
                                            duration:20000,
                                        });
                                    }
                                    },
                                });
                            }
                        }
                    })
        }
        })
    },

    subsribe:function(res){
        debugger
        wx.requestSubscribeMessage({
            tmplIds:['jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY'],
            success(res){
                console.log("订阅成功");
                console.log(res);
                if(res.jvFdutiH3lbhEasg1BfUQ_WIqamSVZbSCAwO8BJDoQY=='accept'){
                    wx.cloud.callFunction({
                        name:'templateMessage',
                        data:{
                        },
                        success(res){
                            console.log(res);
                            console.log("云函数调用成功")
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
    acceptBorrow:function(borrowId){
        var that=this;
        wx.request({
            url: getApp().globalData.url + 'api-scan-borrow-byid/' + borrowId,
            data: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res)=>{
                that.setData({
                    borrowMsg:res.data,
                })
                console.log(that.data.borrowMsg)
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