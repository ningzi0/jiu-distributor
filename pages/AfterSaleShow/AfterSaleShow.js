// pages/AfterSaleShow/AfterSaleShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewId : 0,
    currentId: '1',
    showModal: false,
    imgs: ['https://images.liquorbox.cn/2022-06-10/images/1.jpg','https://images.liquorbox.cn/2022-06-10/images/2.jpg','https://images.liquorbox.cn/2022-06-10/images/3.jpg'],
  },
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  // 预览图片
previewImg: function (e) {
  //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
  //所有图片
  var imgs = this.data.imgs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
    /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
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