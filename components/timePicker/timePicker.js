
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickerShow: {
      type: Boolean,
      observer: function (isPickerShow) {
        if (isPickerShow) {
          this.animationExec(500, 500)
          // console.log(this.data.animation)
          setTimeout(() => {
            this.showDatePlugin(0, 0.7, this)
          }, 0);
        } else {
          this.animationExec(100, 500)
          this.showDatePlugin(-320, 0)
        }
      }
    },
    config: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: '',
    animationOpacity: '',
    conf: '',

  },
  detached: function () {
    console.log("dele");
  },
  attached: function () { },
  ready: function () {
    this.readConfig();
    this.initPick(this.data.config || null);
    this.setData({
      startValue: this.data.startValue,
      endValue: this.data.endValue,
    });




  },
  /**
   * 组件的方法列表
   */
  methods: {
    //阻止滑动事件
    onCatchTouchMove(e) {

    },

    animationExec(intervalOne, intervalTwo) {
      this.data.animation = wx.createAnimation({
        duration: intervalOne,
        timingFunction: "ease"
      });
      this.data.animationOpacity = wx.createAnimation({
        duration: intervalTwo,
        timingFunction: "ease"
      });
    },

    showDatePlugin(height, opacityValue, that) {
      this.data.animation.bottom(height).step();
      this.data.animationOpacity.opacity(opacityValue).step();
      that.setData({
        animationOpacity: this.data.animationOpacity.export(),
        animationData: this.data.animation.export()
      })
    },
    //读取配置项
    readConfig() {
      this.data.conf = this.data.config;
      let limitEndTime = new Date().getTime();
      let limitStartTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
      this.data.conf.limitStartTime = this.data.conf.limitStartTime || new Date().getTime() - 1000 * 60 * 60 * 24 * this.data.conf.dataLimit || formatTime(limitStartTime).str;
      let limitStartTimeDate = new Date(this.data.conf.limitStartTime.replace(/-/g, '/'))
      console.log(limitStartTimeDate)
      limitStartTime = limitStartTimeDate.getTime() || limitStartTime;
      this.data.conf.limitEndTime = this.data.conf.limitEndTime || formatTime(limitEndTime).str;
      let limitEndTimeDate = new Date(this.data.conf.limitEndTime.replace(/-/g, '/'))
      limitEndTime == limitEndTimeDate.getTime() || limitEndTime;
      this.data.conf.yearStart = limitStartTimeDate.getFullYear();
      this.data.conf.yearEnd = limitEndTimeDate.getFullYear();
      this.setData({
        yearStart: this.data.conf.yearStart || 2000,
        yearEnd: this.data.conf.yearEnd || 2100,
        endDate: this.data.conf.endDate || false,
        dateLimit: this.data.conf.dateLimit || false,
        hourColumn: this.data.conf.column == "hour" || this.data.conf.column == "minute" || this.data.conf.column == "second",
        minColumn: this.data.conf.column == "minute" || this.data.conf.column == "second",
        secColumn: this.data.conf.column == "second"
      });
      let limitStartTimeArr = formatTime(limitStartTime);
      let limitEndTimeArr = formatTime(limitEndTime)
      this.setData({
        limitStartTime,
        limitStartTimeArr,
        limitEndTime,
        limitEndTimeArr
      });
    },
    //滚动开始
    handlePickStart: function (e) {
      this.setData({
        isPicking: true
      })
    },
    //滚动结束
    handlePickEnd: function (e) {
      this.setData({
        isPicking: false
      })
    },
    onConfirm: function () {
      if (!this.data.isPicking) {
        let startTime = new Date(this.data.startPickTime.replace(/-/g, "/"));
        let endTime = new Date(this.data.endPickTime.replace(/-/g, "/"));
        if (startTime <= endTime || !this.data.endDate) {
          this.setData({
            startTime,
            endTime
          });
          let startArr = formatTime(startTime).arr;
          let endArr = formatTime(endTime).arr;
          let format0 = function (num) {
            return num < 10 ? '0' + num : num
          }
          let startTimeBack = `${format0(startArr[0])}-${format0(startArr[1])}`
          let endTimeBack = `${format0(endArr[0])}-${format0(endArr[1])}`
          let time = {
            startTime: startTimeBack,
            endTime: endTimeBack
          };
          //触发自定义事件
          this.triggerEvent("setPickerTime", time);
          this.triggerEvent("hidePicker", {});
        } else {
          wx.showToast({
            icon: "none",
            title: "时间不合理"
          });
        }
      }
    },
    hideModal: function () {

      this.triggerEvent("hidePicker", {});
    },
    changeStartDateTime: function (e) {
      let val = e.detail.value;
      console.log(val)
      this.compareTime(val, this.data.conf.yearStart, "start");

    },

    changeEndDateTime: function (e) {
      let val = e.detail.value;
      this.compareTime(val, this.data.conf.yearEnd, "end");

    },

    compareTime(val_, yearLimit, type) {
      const val = val_.map(it => it.toString());
      console.log(val)
      let time = `${yearLimit}-${this.data.MonthList[val[0]]}-${this.data.DayList[val[1]]} 00:00:00`
      let start = this.data.limitStartTime;
      let end = this.data.limitEndTime;
      let timeNum = new Date(time.replace(/-/g, '/')).getTime();
      let month, day,limitDate;
      let tempArr = []
      if (!this.data.dateLimit) {
        limitDate = [
          yearLimit,
          this.data.MonthList[val[0]],
          this.data.DayList[val[1]],

        ]
      } else if (type == "start" && timeNum > new Date(this.data.endPickTime.replace(/-/g, '/')) && this.data.config.endDate) {
        limitDate = formatTime(this.data.endPickTime).arr;

      } else if (type == "end" && timeNum < new Date(this.data.startPickTime.replace(/-/g, '/'))) {
        limitDate = formatTime(this.data.startPickTime).arr;

      } else if (timeNum < start) {
        limitDate = this.data.limitStartTimeArr.arr;

      } else if (timeNum > end) {
        limitDate = this.data.limitEndTimeArr.arr;

      } else {
        limitDate = [
          yearLimit,
          this.data.MonthList[val[0]],
          this.data.DayList[val[1]],
        ]
      }
      month = limitDate[1];
      day = limitDate[2];
      if (type == "start") {
        this.setStartDate(yearLimit, month, day);
      } else if (type == "end") {
        this.setEndDate(yearLimit, month, day);
      }
    },
    getDays: function (year, month) {
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 2) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28;
      } else {
        return daysInMonth[month - 1];
      }
    },
    initPick: function (initData) {
      const date = initData.initStartTime ? new Date(initData.initStartTime.replace(/-/g, '/')) : new Date();
      const endDate = initData.initEndTime ? new Date(initData.initEndTime.replace(/-/g, '/')) : new Date();
      console.log(endDate)
      // const startDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
      const startDate = date;
      const startYear = date.getFullYear();
      const startMonth = date.getMonth() + 1;
      const startDay = date.getDate();
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;
      const endDay = endDate.getDate();
      let YearList = [];
      let MonthList = [];
      let DayList = [];
      // 设置月份列表
      for (let i = 1; i <= new Date().getMonth() + 1; i++) {
        MonthList.push(i);
      }
      // 设置日期列表
      for (let i = 1; i <= 31; i++) {
        DayList.push(i);
      }
      this.setData({
        YearList,
        MonthList,
        DayList,

      });

      this.setStartDate(startYear, startMonth, startDay);
      this.setEndDate(endYear, endMonth, endDay);
    },
    setPickerDateArr(type, year, month, day) {
      let monthIdx = 0;
      let dayIdx = 0;
 
      this.data.MonthList.map((v, idx) => {
        console.log('month:',month)
        if (parseInt(v) === month) {
          
          monthIdx = idx;
          
        }
      });
      
      // 重新设置日期列表
      let DayList = [];
      for (let i = 1; i <= this.getDays(year, month); i++) {
        DayList.push(i);
      }

      DayList.map((v, idx) => {
        if (parseInt(v) === day) {
          
          dayIdx = idx;
        }
      });
      if (type == "start") {
        this.setData({ startDayList: DayList });
      } else if (type == "end") {
        this.setData({ endDayList: DayList });
      }
      return {
        monthIdx,
        dayIdx,
      };
    },
    setStartDate: function (year, month, day) {
      console.log(month)
      let pickerDateArr = this.setPickerDateArr(
        "start",
        year,
        month,
        day
      );
      this.setData({
        startMonthList: this.data.MonthList,
        startDayList: this.data.DayList,
        startValue: [
          pickerDateArr.monthIdx,
          pickerDateArr.dayIdx,
        ],
        startPickTime: `${year}-${this.data.MonthList[pickerDateArr.monthIdx]}-${this.data.DayList[pickerDateArr.dayIdx]} 00:00:00`
      });
    },
    setEndDate: function (year, month, day) {
      let pickerDateArr = this.setPickerDateArr(
        "end",
        year,
        month,
        day,
      );
      this.setData({
        endMonthList: this.data.MonthList,
        endDayList: this.data.DayList,
        endValue: [
          pickerDateArr.monthIdx,
          pickerDateArr.dayIdx,
        ],
        endPickTime: `${year}-${this.data.MonthList[pickerDateArr.monthIdx]}-${this.data.DayList[pickerDateArr.dayIdx]} 00:00:00`
      });
    },
  }
});


function formatTime(date) {

  if (typeof date == 'string' || 'number') {
    try {
      date = date.replace(/-/g, '/')//兼容ios
    } catch (error) {
    }
    date = new Date(date)
  }

  //const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {
    str: [month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'),
    arr: [month, day, hour, minute, second]
  }
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
