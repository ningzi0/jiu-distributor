// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myContent:[{
      icon:'/images/jinhuochaxun.png',
      text:'进货单',
      url:'/pages/jinhuo/jinhuo'
    },
    {
      icon:'/images/dingdan.png',
      text:'顾客订单',
      url:'/pages/order/order'
    },
    {
      icon:'/images/yingyezizhi.png',
      text:'资质管理',
      url:'/pages/License/License'
    },
    {
      icon:'/images/qianbao.png',
      text:'钱包管理',
      url:'/pages/wallet/wallet'
    },
    {
      icon:'/images/hetong.png',
      text:'合同管理',
      url:'/pages/hetong/hetong'
    },
    {
      icon:'/images/shouji.png',
      text:'换绑手机号',
      url:'/pages/phone/phone'
    },
    // {
    //   icon:'/images/weixin.png',
    //   text:'微信',
    // }
  ]
  },
  wechat: function(){
    wx.showModal({

      title: '提示',
 
      content: '当前供应商已绑定微信账号：null，确定解除与微信账号的绑定吗？',
 
      success: function (res) {
 
        if (res.confirm) {//这里是点击了确定以后
 
          console.log('用户点击确定')
 
        } else {//这里是点击了取消以后
 
          console.log('用户点击取消')
 
        }
 
      }
 
    })
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