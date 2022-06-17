// index.js
// 获取应用实例
const app = getApp()


Page({
  data: {
    switch1Checked: true,
    time: '09:30',
    time2: '23:00',
    open: false,
    currentId: '1',
    section:[{
      orderTabItem:'待发货',
      typeId: '1'
    },
    {
      orderTabItem:'已发货',
      typeId: '2'
    }],

    h_data:[{
      h_data_tit:'支付金额',
      h_data_num:'168',
      h_data_contrast:'-'
    },{
      h_data_tit:'销售数量',
      h_data_num:'2',
      h_data_contrast:'-'
    }],
    toolCard:[{
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/fabu.png',
      text:'进货'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/shangpin.png',
      text:'商品管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/order.png',
      text:'订单管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/pijiu.png',
      text:'资料管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/zijin.png',
      text:'资金管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/daohangdizhi.png',
      text:'地址管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/hetong.png',
      text:'合同管理'
    },
    {
      image:'https://images.liquorbox.cn/2022-06-14%20business/images/shouhou.png',
      text:'售后管理'
    }]

    // currentId: '1',
    // section: [{
    //   name: '订单管理',
    //   typeId: '1',
    //   tagsNum:'5',
    //   active:'active'
    // }, {
    //   name: '商品管理',
    //   typeId: '2'
    // }],
  },
  //点击每个导航的点击事件
  // handleTap: function(e) {
  //   let id = e.currentTarget.id;
  //   if(id){
  //     this.setData({
  //       currentId:id
  //     })
  //   }
  // },
  // 扫码
  // saoma:function(){
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //   })
  // },
  bindTimeChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onChange(e) {
    var that = this;
    that.setData({
      open: !that.data.open
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

  // 点击复制
  copy:function(e){
    let that=this;
    wx.setClipboardData({
      data: that.data.id, //这个是要复制的数据
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  onLoad() {
    
  },
  

})
