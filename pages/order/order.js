// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    date: '起始时间',
    date2: '终止时间',
    currentId: '1',
    currentId2: '1',
    section:[{
      orderTabItem:'订单',
      typeId: '1'
    },
    {
      orderTabItem:'进货单',
      typeId: '2'
    }],
    section2:[{
      orderTabItem:'待发货',
      typeId: '1'
    },
    {
      orderTabItem:'已发货',
      typeId: '2'
    },
    {
      orderTabItem:'全部',
      typeId: '3'
    }],
  },
  click:function(e){
    this.setData({
        hidden:!this.data.hidden
    })
},
tapName:function(event){
  console.log(1111)
  this.setData({
    hidden:!this.data.hidden
})
},

tapScreenWarp:function(event){
  this.setData({
    hidden:!this.data.hidden
})
},

tapScreen:function(event){
  this.setData({
    hidden:false
})
},
tapScreenTime:function(event){
  this.setData({
    hidden:true
})
},

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      hidden:false
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value,
      hidden:false
    })
  },

  chanageDate:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  chanageDate2:function(e){
    this.setData({
      date2:e.detail.value
    })
  },
  //点击每个导航的点击事件
handleTap: function(e) {
  let id = e.currentTarget.id;
  if(id){
    this.setData({
      currentId:id
    })
  }
},
 //点击每个导航的点击事件
 handleTap2: function(e) {
  let id = e.currentTarget.id;
  if(id){
    this.setData({
      currentId2:id
    })
  }
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