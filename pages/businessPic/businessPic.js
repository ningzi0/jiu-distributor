// pages/businessPic/businessPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic1.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic2.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic3.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic4.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic5.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic6.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic1.jpg",
      "https://images.liquorbox.cn/2022-06-14%20business/images/pic2.jpg",
      ],
    hiddenName:true
  },  
//预览图片，放大预览
preview(event) {
  let index = event.currentTarget.dataset.index
  wx.previewImage({
  current: this.data.imgList[index], // 当前显示图片的http链接
  urls: this.data.imgList // 需要预览的图片http链接列表
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  shghnn:function(){
    this.setData({
        hiddenName:!this.data.hiddenName
    })
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