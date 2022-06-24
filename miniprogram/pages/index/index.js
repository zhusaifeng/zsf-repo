
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    animated: false,
  },

getMyInfo: function(e){
// 一组动画完成
this.animated.rotate(360).step()
    this.setData({
      // 导出动画序列
      animated:this.animated.export()
    })
setTimeout(function(){
  wx.switchTab({
    url: '/pages/books/books',
  });
},500)
getApp().globalData.userInfo = e.detail.userInfo;
this.onGetOpenid();


},


getMyInfo2: function(e){
  getApp().globalData.userInfo = e.detail.userInfo;
  this.animated.rotate(360).step()
    this.setData({
      animated:this.animated.export()
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/register/register',
      });
    },500)
  },


onGetOpenid: function () {
  // 调用云函数获取openid
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: (res) => {
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

    var that=this;
    // 执行动画赋值
    that.animated=wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });

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