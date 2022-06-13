
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

getMyInfo: function(e){
 console.log(e.detail.userInfo)
wx.switchTab({
  url: '/pages/books/books',
});
getApp().globalData.userInfo = e.detail.userInfo;
this.onGetOpenid();
},


onGetOpenid: function () {
  // 调用云函数获取openid
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: (res) => {
      console.log(res)
      console.log('[云函数] [login] user openid: ', res.result.openid);
      // app.globalData.openid = res.result.openid
      this.btnlogin(res.result.openid);
    },
    fail: (err) => {
      console.error('[云函数] [login] 调用失败', err);
    },
  });
},

btnlogin: function (openId) {
  wx.request({
    url: getApp().globalData.url + 'api-user-login',
    data: {
      username: openId,
      password: 123456,
    },
    method: 'GET',
    success: (res) => {
      console.log(openId);
      console.log(res);
      if (res.data.userId != null) {
        getApp().globalData.user = res.data;
        console.log(res);
        this.setData({
          show: false,
          animated: false,
        })
      } else {
      }
    },
  });
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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