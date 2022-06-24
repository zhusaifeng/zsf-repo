Page({
    data: {
    errorStatus: 0
    },
    onLoad: function (option) {
    let errorStatus = option.errorStatus;
    if (errorStatus == 1) {
        this.setData({ errorStatus: 1 });
    }
    },
    formSubmit: (e) => {
    wx.request({
        url: getApp().globalData.url + 'api-user-login',
        data: { username: e.detail.value.username, password: e.detail.value.password },
        method: 'GET',
        success: function (res) {
        if (res.data.userId != null) {
            // console.log(res.data);
            //登录成功
            //微信端登录
            var app = getApp();
            app.getUserInfo();
            getApp().globalData.user = res.data;
            wx.switchTab({
            url: '/pages/books/books'
            })
        } else {
            //登录失败
            wx.redirectTo({
            url: '/pages/login/login?errorStatus=1'
            })
        }
        }
    });
    },
    navBtnOnClick: () => {
    wx.redirectTo({
        url: '/pages/register/register'
    })
    }
})