// pages/analysis/analysis.js
var util = require('../../utils/util.js');
import * as echarts from '../../ec-canvas/echarts';
// var wxCharts = require('../../utils/wxcharts.js');
// var app = getApp();
// var daylineChart = null;
// var yuelineChart = null;



const app = getApp();
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    // title: {
    //   text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },

    isPickerRender: false,
    isPickerShow: false,
    chartHide: false,
    startTime: "自定义",
    endTime: "",
    pickerConfig: {
      endDate: true,
      column: "second",
      dateLimit: true,
      initStartTime: "2022-01-01 12:32:44", 
      //initEndTime: "2022-12-01 12:32:44",
      limitStartTime: "2022-01-01 12:32:44",
      limitEndTime: "2022-05-06 12:32:44"
    },

    currentId: '1',
    section: [{
      name: '销售量(件)',
      num: '0',
      typeId: '1'
    }, {
      name: '商家货款(元)',
      num: '--',
      typeId: '2'
    }],
    date: '2022-03-29',
  },
  pickerShow: function() {
    this.setData({
      isPickerShow: true,
      isPickerRender: true,
      chartHide: true
    });
  },
  pickerHide: function() {
    this.setData({
      isPickerShow: false,
      isPickerRender: false,
      chartHide: false
    });
  },

  bindPickerChange: function(e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    console.log(this.data.sensorList);

    this.getData(this.data.sensorList[e.detail.value].id);
    // let startDate = util.formatTime(new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7));
    // let endDate = util.formatTime(new Date());
    this.setData({
      index: e.detail.value,
      sensorId: this.data.sensorList[e.detail.value].id
      // startDate,
      // endDate
    });
  },
  setPickerTime: function(val) {
    console.log(val);
    let data = val.detail;
    this.setData({
      startTime: data.startTime,
      endTime: data.endTime
    });
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

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // wxchart
  // getMothElectro:function(){
  //   var windowWidth = 380;
  //   try {
  //     var res = wx.getSystemInfoSync();
  //     windowWidth = res.windowWidth;
  //   } catch (e) {
  //     console.error('getSystemInfoSync failed!');
  //   }
  //   yuelineChart = new wxCharts({                                                                                                     //当月用电折线图配置
  //     canvasId: 'yueEle',
  //     type: 'line',
  //     categories: ['23:00', '11:00', '00:00'], 
  //     animation: true,
  //     series: [{
  //       name: ' ',
  //       data: [0, 0, 0],
  //       format: function (val, name) {
  //         return val.toFixed(2) + 'kWh';
  //       }
  //     }],
  //     xAxis: {
  //       disableGrid: true
  //     },
  //     yAxis: {
  //       format: function (val) {
  //         return val.toFixed(2);
  //       },
  //       max: 5,
  //       min: 0
  //     },
  //     width: 320,
  //     height: 200,
  //     dataLabel: false,
  //     dataPointShape: true,
  //     extra: {
  //       lineStyle: 'curve'
  //     }
  //   });
  // },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });

    // this.getMothElectro();
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