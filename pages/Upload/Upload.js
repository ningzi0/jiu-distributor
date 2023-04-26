// pages/Upload/Upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    maxTextLen:30,
    textLen:0,
  },



  getWords(e){
    let page = this;
    let maxTextLen = page.data.maxTextLen;
    let textLen = e.detail.value.length;

    page.setData({
      maxTextLen:maxTextLen,
      textLen:textLen,
    })

  },

//选择要上传的图片
upload () {
  var that = this;
  // 最好只能选5张
  if (that.data.imgArr&&that.data.imgArr.length < 5) {
    wx.chooseImage({
      count: 5 - that.data.imgArr.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        that.setData({
          imgArr: that.data.imgArr.concat(res.tempFilePaths)
        })
      }
    })
  } else {
    wx.showToast({
      title: '最多上传五张图片',
      icon: 'none',
      duration: 3000
    });
  }
},
 // 预览图片，放大预览
 preview(event) {
  console.log(event.currentTarget.dataset.src)
  let currentUrl = event.currentTarget.dataset.src
  wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls: this.data.imgArr // 需要预览的图片http链接列表
  })
},
// 删除图片
deleteImg (e) {
  var that=this;
  var index = e.currentTarget.dataset.index;
  const pictureArr = that.data.imgArr[index].split('/')
  that.data.imgArr.splice(index, 1)
  that.setData({
     imgArr: that.data.imgArr || []
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})