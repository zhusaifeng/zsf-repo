// pages/register/register.js
const app = getApp();

Page({
data: {
    errorStatus: 0,
    openId: '',
},
onLoad: function (option) {
    if (!wx.cloud) {
    wx.redirectTo({
        url: '../index/index',
    });
    return;
    }
    let errorStatus = option.errorStatus;
    if (errorStatus == 1) {
    this.setData({ errorStatus: 1 });
    }
},

formSubmit: function (e) {
    if (!e.detail.value.user_true_name || !e.detail.value.user_depart) {
    wx.showToast({
        title: '请输入所有信息再进行注册',
        icon: 'none',
        duration: 2000,
    });
    return false;
    }
    const reg = /^1(3|4|5|7|8)\d{9}$/;
    if (!e.detail.value.user_phone) {
    wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
    });
    return false;
    } else if (!reg.test(e.detail.value.user_phone)) {
    wx.showToast({
        title: '请填写正确的手机号码！',
        icon: 'none',
        duration: 2000,
    });
    return false;
    }
    var that = this;
    // 调用云函数获取openid
    wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: (res) => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        // app.globalData.openid = res.result.openid
        this.setData({ openId: "oAINZ41ClemedhAtskKh9D_c2EUQ" });
        console.log('registerMsg: ', e.detail.value);
        let params = {
        username: "oAINZ41ClemedhAtskKh9D_c2EUQ",
        password: 123456,
        password2: 123456,
        user_true_name: e.detail.value.user_true_name,
        user_depart: e.detail.value.user_depart,
        user_phone: e.detail.value.user_phone,
        user_head_url: "getApp().globalData.userInfo.avatarUrl",
        user_nickname: getApp().globalData.userInfo.nickName,
          // user_nickname: '😄',
        user_openid:"oAINZ41ClemedhAtskKh9D_c2EUQ",
        };
        this.loginRigister(params);
    },
    fail: (err) => {
        console.error('[云函数] [login] 调用失败', err);
        wx.showToast({
        title: '网络错误请重新打开小程序',
        icon: 'none',
        duration: 2000,
    });
    },
    });
    
},
loginRigister: function (params) {
    //执行注册
wx.request({
    url: getApp().globalData.url + 'api-user-register',
    data: params,
    method: 'GET',
    success: (res) => {
        if (res.data == 1) {
          //注册成功
        wx.redirectTo({
            url: '/pages/books/books',
        });
        } else {
          //注册失败
        // 
        wx.redirectTo({
            url: '/pages/register/register?errorStatus=1',
        });
        }
    },
    });
},
});
