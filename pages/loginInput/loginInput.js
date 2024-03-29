var address = require("../../utils/mock.js")
Page({
    /**
    * 控件当前显示的数据
    * provinces:所有省份
    * citys 选择省对应的所有市,
    * areas 选择市对应的所有区
    * areaInfo：点击确定时选择的省市县结果
    * animationAddressMenu：动画
    * addressMenuIsShow：是否可见
    */
    data: {
      imgs: ['/images/license.jpg'],

        animationAddressMenu: {},
        addressMenuIsShow: false,
        value: [0, 0, 0],
        provinces: [],
        citys: [],
        areas: [],
        areaInfo: ''
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        // 默认联动显示北京
        var id = address.provinces[0].id
        this.setData({
        provinces: address.provinces,
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
        })
    },
    // 点击所在地区弹出选择框
    select: function (e) {
        // 如果已经显示，不在执行显示动画
        if (this.data.addressMenuIsShow) {
        return false
        } else {
            // 执行显示动画
            this.startAddressAnimation(true)
        }
    },
    // 执行动画
    startAddressAnimation: function (isShow) {
        if (isShow) {
            // vh是用来表示尺寸的单位，高度全屏是100vh
            this.animation.translateY(0 + 'vh').step()
         } else {
                this.animation.translateY(40 + 'vh').step()
          }
        this.setData({
            animationAddressMenu: this.animation.export(),
            addressMenuIsShow: isShow,
        })
    },
    // 点击地区选择取消按钮
    cityCancel: function (e) {
        this.startAddressAnimation(false)
    },
    // 点击地区选择确定按钮
    citySure: function (e) {
        var that = this
        var city = that.data.city
        var value = that.data.value
        this.startAddressAnimation(false)
        // 将选择的城市信息显示到输入框
        var areaInfo = that.data.provinces[value[0]].name + '·' + that.data.citys[value[1]].name + '·' + that.data.areas[value[2]].name
        that.setData({
            areaInfo: areaInfo,
        })
    },
    // 处理省市县联动逻辑
    cityChange: function (e) {
        var value = e.detail.value
        var provinces = this.data.provinces
        var citys = this.data.citys
        var areas = this.data.areas
        var provinceNum = value[0]
        var cityNum = value[1]
        var countyNum = value[2]
        // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
        if (this.data.value[0] != provinceNum) {
            var id = provinces[provinceNum].id
            this.setData({
                value: [provinceNum, 0, 0],
                citys: address.citys[id],
                areas: address.areas[address.citys[id][0].id],
            })
        } else if (this.data.value[1] != cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
            var id = citys[cityNum].id
            this.setData({
                value: [provinceNum, cityNum, 0],
                areas: address.areas[citys[cityNum].id],
            })
        } else {
            // 滑动选择了区
            this.setData({
                value: [provinceNum, cityNum, countyNum]
            })
        }
    },
    onShow: function () {
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'linear',
        })
        this.animation = animation
    },
    // 上传图片
chooseImg: function (e) {
  var that = this;
  var imgs = this.data.imgs;
  if (imgs.length >= 9) {
    this.setData({
      lenMore: 1
    });
    setTimeout(function () {
      that.setData({
        lenMore: 0
      });
    }, 2500);
    return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var imgs = that.data.imgs;
      // console.log(tempFilePaths + '----');
      for (var i = 0; i < tempFilePaths.length; i++) {
        if (imgs.length >= 9) {
          that.setData({
            imgs: imgs
          });
          return false;
        } else {
          imgs.push(tempFilePaths[i]);
        }
      }
      // console.log(imgs);
      that.setData({
        imgs: imgs
      });
    }
  });
},
// 删除图片
deleteImg: function (e) {
  var imgs = this.data.imgs;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
    imgs: imgs
  });
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
})