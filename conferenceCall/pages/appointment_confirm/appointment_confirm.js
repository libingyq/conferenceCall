// pages/appointment_confirm/appointment_confirm.js
import store from '../../service/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confName:'',
    date:'',
    time:'',
    startTime:'',
    selectedUsers:[],
    delBtnWidth: 290,    //删除按钮宽度单位（rpx）
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initEleWidth(); 
    console.log(options.confName)
      var that=this;
      var users = store.get('key3')
      console.log(users)
      that.setData({
        confName: options.confName,
        date:options.date,
        time:options.time,
        startTime: options.date +' '+ options.time,
        selectedUsers: users,
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
  //结束new
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      //past
      // var list = this.data.list;
      // if (index != "" && index != null) {
      //     list[parseInt(index)].left = left;
      //     this.setData({
      //         list: list
      //     })
      //     console.log(this.data.list);
      // }
      var selectedUsers = this.data.selectedUsers;
      console.log(selectedUsers)
      if (index != "" && index != null) {
        selectedUsers[parseInt(index)].left = left;
        this.setData({
          selectedUsers: selectedUsers
        })
        // console.log(this.data.selectedUsers);
      }

    }
  },

  touchE: function (e) {
    console.log('0000')
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      var selectedUsers = this.data.selectedUsers;
      console.log(left);
      console.log('------------')
      if (index !== "" && index != null) {
        selectedUsers[parseInt(index)].left = left;
        this.setData({
          selectedUsers: selectedUsers
        })
      }
    }
  },
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var selectedUsers = this.data.selectedUsers;
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          selectedUsers.splice(index, 1);
          _this.setData({
            selectedUsers: selectedUsers
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

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
  },

})