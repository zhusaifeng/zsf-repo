
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    animated: false,
  },

getMyInfo: function(e){
console.log(e.detail.userInfo)
wx.switchTab({
  url: '/pages/books/books',
});
getApp().globalData.userInfo = e.detail.userInfo;
this.onGetOpenid();
},


getMyInfo2: function(e){
  console.log(e.detail.userInfo)
  getApp().globalData.userInfo = e.detail.userInfo;
  wx.navigateTo({
    url: '/pages/register/register',
  });
  },


onGetOpenid: function () {
  // 调用云函数获取openid
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: (res) => {
      console.log("云函数调用成功，用户openid为：", res.result.openid);
      // app.globalData.openid = res.result.openid
      this.btnlogin(res.result.openid);
    },
    fail: (err) => {
      console.error('[云函数] [login] 调用失败', err);
    },
  });
},

btnlogin: function (openId) {
  console.log(openId)
  wx.request({
    url: getApp().globalData.url + 'api-user-login',
    data: {
      username: "oAINZ41ClemedhAtskKh9D_c2EUQ",
      password: 123456,
    },
    method: 'GET',
    success: (res) => {
      if (res.data.userId != null) {
        getApp().globalData.user = res.data;
        this.setData({
          show: false,
          animated: false,
        })
      } else {
      }
    },
    fail:(res)=>{
      console.log("接口调用失败")
    }
  });
},

// register:function(e){
//   wx.navigateTo({
//   url: '/pages/register/register',
//   });
//   this.getMyInfo();
// },


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