// pages/meeting_detail/index.js
import store from '../../service/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[]
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
    /*获取到的通讯录列表*/
    var list = store.get('keyList')
    var detailIndex = store.get('detailIndex')
    // 因为把第一个联系人列表删除了，所以所有的都要加1
    var detailList = list[detailIndex+1].users
    //  为了解决我的用户组是除了所有联系人的情况
    //  list.shift();
    //  console.log(list)
    var that = this
    that.setData({
      detailList: detailList
    })
    console.log(this.data.detailList)
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
  navigateBack: function () {
      wx.navigateBack({
          delta: 1
      })
  }
})