
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
        bookRecommend: [],
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
                console.log(res);
                if(res.data.bookPress==""){res.data.bookPress="数据正在更新中"};
                if(res.data.bookAuthor==""){
                    res.data.bookAuthor="数据正在更新中";
                };
                if(res.data.bookDesc==null){res.data.bookDesc="数据正在更新中"};
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

        wx.request({
            url: getApp().globalData.url + 'api-book-recommend/' + bookId,
            data: {},
            method: 'GET',
            success: function (res) {
            if (res.statusCode == 200) {
                that.setData({
                bookRecommend: res.data,
                });
            }
            },
        });
    },

    bookDetailBtn:function(e){
    var bookId=e.currentTarget.id;
    wx.navigateTo({
        url:'/pages/book-detail/book-detail?bookId='+bookId,
    })

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


    // 获取借阅事件
    writeCurrentDate: function (isBorrowTime) {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        var day = now.getDay(); //得到周几
        var hour = now.getHours(); //得到小时
        var minu = now.getMinutes(); //得到分钟
        var sec = now.getSeconds(); //得到秒
        var MS = now.getMilliseconds(); //获取毫秒
        month = month + 1;
        if (month < 10) month = '0' + month;
        if (date < 10) date = '0' + date;
        if (hour < 10) hour = '0' + hour;
        if (minu < 10) minu = '0' + minu;
        if (sec < 10) sec = '0' + sec;
        if (MS < 100) MS = '0' + MS;
        var time = '';
        if (isBorrowTime) {
        time = `${year}-${month}-${date}`;
        } else {
        var mydate2 = new Date();
        mydate2.setDate(mydate2.getDate() + 7);
        time = `${mydate2.getFullYear()}-${
            mydate2.getMonth() + 1
        }-${mydate2.getDate()}`;
        }
        return time;
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
                var borrowBookName = that.data.borrowMsg.book.bookName;
                var borrowUserName = that.data.borrowMsg.user.user_true_name;
                var borrowStartTime = that.writeCurrentDate(true);
                var borrowEndTime = that.writeCurrentDate(false);
                //请求批准借阅接口
                wx.request({
                    url: getApp().globalData.url + 'api-scan-allow-borrow/' + borrowId,
                    data: {},
                    method: 'GET',
                    success: function (res) {
                    that.setData({
                        show: false,
                        animated: false,
                    });
                    console.log('借书成功');
                    debugger
                    wx.redirectTo({
                        url: '/pages/user-borrow/user-borrow',
                    });
                    
                    },
                    fail: (err) => {
                    wx.showToast({
                        title: '借书失败，请联系行政人员',
                        icon: 'error',
                        duration: 2000,
                    });
                    },
                });
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