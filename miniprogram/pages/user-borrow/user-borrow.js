// pages/user-borrow/user-borrow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        borrowList:0,
        show:false,
        animated:false,
        borrowBookName:"",
        endTime:"",
        startTime:""
        // clock:"",
        // countHour: null,
        // countMinute: null,
        // countSecond: null,
        },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            show: true,
            animated: true,
        });
        var that = this;
        var userId = getApp().globalData.user.userId;
        wx.request({
            url: getApp().globalData.url + 'api-scan-borrowed-byuserid/' + userId,
            data: {},
            header: {'content-type':'application/json'},
            method: 'GET',
            success: (res)=>{
                that.setData({
                    show: false,
                    animated: false,
                });
                var data = res.data;

                for (var i = 0; i < data.length; ++i) {
                    //借书时间
                    data[i].borrowStartTime = new Date();
                    console.log(data[i].borrowStartTime);
                    var mydate =
                    data[i].borrowStartTime.getFullYear() +
                    '-' +
                    (data[i].borrowStartTime.getMonth() + 1) +
                    '-' +
                    data[i].borrowStartTime.getDay()+
                    '  '+
                    data[i].borrowStartTime.getHours()+
                    ':'+
                    data[i].borrowStartTime.getMinutes()+
                    ':'+data[i].borrowStartTime.getSeconds();
                    //应还时间
                    var mydate2 = new Date();
                    mydate2.setDate(data[i].borrowStartTime.getDate() + 7);
                    // var mydate2 = data[i].borrowStartTime.getFullYear() + "-" + (data[i].borrowStartTime.getMonth() + 2) + "-" + data[i].borrowStartTime.getDate();
                    // if ((data[i].borrowStartTime.getMonth() + 2) == 13) {
                    //   mydate2 = data[i].borrowStartTime.getFullYear() + 1 + "-" + (data[i].borrowStartTime.getMonth() + 1 - 11) + "-" + data[i].borrowStartTime.getDate();
                    // }
                    data[i].borrowStartTime = mydate;
                    data[i].borrowShouldTime =
                    mydate2.getFullYear() +
                    '-' +
                    (mydate2.getMonth() + 1) +
                    '-' +
                    mydate2.getDate()+
                    ' '+
                    mydate2.getHours()+
                    ':'+
                    mydate2.getMinutes()+
                    ':'+
                    mydate2.getSeconds();
                    data[i].borrowShouldTime = data[i].borrowShouldTime.replace(
                    /\-/g,
                    '-'
                    );
                }
                that.setData({ 
                    borrowList: data,
                    endTime:data[0].borrowShouldTime,
                    startTime:data[0].borrowStartTime
                });
            },
            fail: ()=>{},
            complete: ()=>{}
        });

        this.singleCountDown();
    },


    timeFormat(param) {
        return param < 10 ? '0' + param : param;
    },
      //倒计时
    singleCountDown: function () {
        var that = this;
        var time = 0;
        var obj = {};
        var endTime = new Date(that.data.endTime).getTime();//结束时间时间戳
        var startTime = new Date().getTime();//当前时间时间戳
        time = (endTime - startTime) / 1000;
        // 如果活动未结束
        if (time > 0) {
          var hou = parseInt(time / (60 * 60));
          var min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
            hou: that.timeFormat(hou),
            min: that.timeFormat(min),
            sec: that.timeFormat(sec)
        }
        } else { //活动已结束
        obj = {
            hou: "00",
            min: "00",
            sec: "00"
        }
          clearTimeout(that.data.timeIntervalSingle); //清除定时器
        }
        var timeIntervalSingle = setTimeout(that.singleCountDown, 1000);
        that.setData({
        timeIntervalSingle,
        txtTime: obj,
        })
    },
    



    returnBtn: function (event) {
        var bookId = event.currentTarget.id;
        var status = event.currentTarget.dataset.borrowstatus;
        var that = this;
        var userId = getApp().globalData.user.userId;
        var userCredit = getApp().globalData.user.userCredit;
        wx.requestSubscribeMessage({
        tmplIds: ['XL4TdPW3FyZeaLGikS_L2ujiTnIpXipEcSDie9OU2WY'],
        success(res) {
            console.log(res);
            if (res.XL4TdPW3FyZeaLGikS_L2ujiTnIpXipEcSDie9OU2WY == 'accept') {
            wx.request({
                url:
                getApp().globalData.url +
                'api-scan-return/' +
                userId +
                '/' +
                bookId +
                '/' +
                status,
                data: {},
                method: 'GET',
                success: function (res) {
                that.setData({ borrowId: res.data });
                that.acceptReturn(res.data);
                },
            });
            }
        },
        });
    },

    acceptReturn: function (borrowId) {
        this.setData({
        show: true,
        animated: true,
        });
        var that = this;
        var timestamp = new Date().getTime();
        wx.request({
        url: getApp().globalData.url + 'api-scan-borrow-byid/' + borrowId,
        data: {},
        method: 'GET',
        success: function (res) {
            console.log(res);
            that.setData({ borrowMsg: res.data });
            console.log(res.data);
            var borrowBookName = res.data.book.bookName.substring(0,10);
            var borrowUserName = res.data.user.user_true_name;
            var borrowStartTime = that.writeCurrentDate(true);
            var borrowEndTime = that.writeCurrentDate(false);
            console.log(borrowBookName+"=====================borrowBookName");
            //判断二维码是否过期
            // var qrborrowStartTime = that.data.borrowMsg.borrowStartTime;
            // console.log('borrowStartTime: ' + qrborrowStartTime);
            // console.log('timestamp:' + timestamp);
            // console.log(timestamp - qrborrowStartTime);
            //请求批准归还接口
            wx.request({
            url: getApp().globalData.url + 'api-scan-allow-return/' + borrowId,
            data: {},
            method: 'GET',
            success: function (res) {
                that.setData({
                show: false,
                animated: false,
                });
                console.log('归还成功');
                // 调用云函数推送订阅
                wx.cloud.callFunction({
                    name:'templateMessage',
                    data:{
                        action: 'sendReturnSubscribeMessage',
                        data:{
                            // 书名
                            name1: borrowBookName,
                            // 借阅者
                            name2: borrowUserName,
                            // 还书时间
                            time5: borrowStartTime,
                             // 备注
                            thing4: '归还成功',
                        }
                    },
                    success:(res)=>{
                        console.log("云函数调用成功"+res)
                        wx.showToast({
                            title: '还书成功',
                            icon: 'success',
                            duration: 2000,
                        });
                        wx.navigateTo({
                            url: '/pages/book-grade/book-grade',
                        });
                    },
                    fail: (err) => {
                        console.error('[云函数]调用失败', err);
                        console.log(borrowBookName+"======borrowBookName")
                    },
                })
                
                // wx.redirectTo({
                //     url: '/pages/book-grade/book-grade?borrowId=' + borrowId,
                // });
            },
            fail: (err) => {
                wx.showToast({
                title: '还书失败，请联系行政人员',
                icon: 'error',
                duration: 2000,
                });
            },
            });
        },
        });
    },

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
        time = `${year}年${month}月${date}日 ${hour}:${minu}`;
        } else {
        time = `${year}年${month}月${date + 7}日 ${hour}:${minu}`;
        }
        return time;
    },
})