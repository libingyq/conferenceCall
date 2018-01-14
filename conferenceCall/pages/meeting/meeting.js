import store from '../../service/store.js'

// pages/meeting/meeting.js
const app = getApp();
Page({
  /*
   * 页面的初始数据
   */
  data: {
      currentTab: 0,
      list:[],
      // 详情的index
      // detailIndex:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
  /**
   * 生命周期函数--监听页面初次渲染完成0
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      /*获取到的通讯录列表*/
   var list=store.get('keyList')
 
  //  为了解决我的用户组是除了所有联系人的情况
   var listSort=list.slice(1);
  //  console.log(list)
   var that=this
   that.setData({
     list: listSort
   })
   console.log(this.data.list)
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
  //点击开会里的详情
  clickDetail:function(event){
      console.log(event)
      var detailIndex = event.currentTarget.dataset.index
      console.log(detailIndex);
      store.set('detailIndex',detailIndex);
  },
  /* 点击item */
  tabSwitch: function (event) {
      var current = event.target.dataset.current;
      this.setData({
          currentTab: current
      })
  },
  navigateToJoinMeeting: function () {
      wx.navigateTo({
          url: '../join_meeting/join_meeting',
      })
     
  },
  navigateToStartMeeting: function () {
      wx.navigateTo({
          url: '../start_meeting/start_meeting',
      })
  }
})