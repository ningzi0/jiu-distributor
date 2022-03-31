// index.js
// 获取应用实例
const app = getApp()


Page({
  data: {

    currentId: '1',
    section: [{
      name: '订单管理',
      typeId: '1',
      tagsNum:'5',
      active:'active'
    }, {
      name: '商品管理',
      typeId: '2'
    }],
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
  // 扫码
  saoma:function(){
    wx.scanCode({
      onlyFromCamera: true,
    })
  },
  onLoad() {
    
  },
  

})
