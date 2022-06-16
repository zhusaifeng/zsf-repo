// pages/main/main.js
Page({
    data: {
    creditGood: false,
    specialOn: false,
    messageBtnClass: 'top-tag active',
    specialBtnClass: 'top-tag',
    user: {},
    borrowWillOverdue: {},
    borrowOverdue: {},
    hotBookList: {},
    recommendBookList: {},
    newBookList: {},
    forumBookList: {}
    },
    onLoad: function () {
    var that = this;
      //获取用户信息
    that.setData({user: getApp().globalData.user});
      //判断信用是否达标
    if (getApp().globalData.user.userCredit >= 50) {
        wx.setNavigationBarTitle({ title: '创辉达图书借阅' });
        that.setData({creditGood: true});
    }
      //获取即将借阅到期的图书集合
    wx.request({
        url: getApp().globalData.url + 'api-index-getBorrowWillOverdue/' + that.data.user.userId,
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({borrowWillOverdue: res.data});
        }
    })
      //获取已经逾期未还的图书集合
    wx.request({
        url: getApp().globalData.url + 'api-index-getBorrowOverdue/' + that.data.user.userId,
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({ borrowOverdue: res.data });
        }
    })
      //获取热门图书
    wx.request({
        url: getApp().globalData.url + 'api-index-getHotBook',
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({ hotBookList: res.data });
        }
    })
      //获取推荐图书
    wx.request({
        url: getApp().globalData.url + 'api-index-getRecommendBook/' + 1,
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({ recommendBookList: res.data });
        }
    })
      //获取新书
    wx.request({
        url: getApp().globalData.url + 'api-index-getNewBook',
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({ newBookList: res.data });
        }
        })
      //获取书友图书
    wx.request({
        url: getApp().globalData.url + 'api-index-getForumBook',
        data: {},
        method: 'GET',
        success: function (res) {
        that.setData({ forumBookList: res.data });
        }
    })
    },
    bookDetailBtn: function (e) {
        var bookId = e.currentTarget.id;
        wx.navigateTo({
            url: '/pages/book-detail/book-detail?scanCode=0&bookId=' + bookId
        })
        // console.log(bookId);
    },

    bookDetailBtn2: function (e) {
        console.log(e,"=====e");
        var bookId = e.currentTarget.id;
        console.log(bookId);
        wx.navigateTo({
            url: '/pages/book-detail/book-detail?scanCode=0&bookId=' + bookId
        })
        console.log(bookId);
    },
})