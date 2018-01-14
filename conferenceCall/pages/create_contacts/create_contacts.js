// pages/create_contacts/create_contacts.js
import api from '../../service/api.js';
import utils from '../../utils/util.js';
import { getWxCode, getOpenId, bindUser } from '../../service/promise.js'
import store from '../../service/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phonenumber:'',
    list:[]
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

    //  为了解决我的用户组是除了所有联系人的情况
    var listSort = list.slice(1);
    //  console.log(list)
    var that = this
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
  //下面--self
   bindKeyInput: function (e) {
    // console.log(e);
    var value1= e.detail.value
    // console.log(value1)
    var pos = e.detail.cursor
    var inputType1 = e.currentTarget.dataset.type;
    // console.log(inputType)
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }
    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    if (inputType1 === 'username') {
      this.setData({
        username: value1
      })
    }
    if (inputType1 === 'phonenumber') {
      this.setData({
        phonenumber: value1
      })
    }
  },
  doCreate: function(){
    var username = utils.trim(this.data.username);
    // console.log(username)
    var phonenumber = utils.trim(this.data.phonenumber);
    var uPattern = /^[\u4E00-\u9FA5A-Za-z]+$/
    var patternPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    //暂时去掉
    // if (!patternPhone.test(phonenumber)) {
    //   return wx.showModal({
    //     title: '提示',
    //     content: '请输入正确的手机号',
    //     showCancel: false,
    //     confirmColor: '#5996ad'
    //   })
    // }
    // if (!uPattern.test(username)) {
    //   return wx.showModal({
    //     title: '提示',
    //     content: '请输入正确的用户名',
    //     showCancel: false,
    //     confirmColor: '#5996ad'
    //   })
    // }
    //结束
    // console.log(this.data.username);
    // wx.navigateTo({
    //   url: '../start_meeting/start_meeting?username=' + this.data.username + "&phonenumber=" + this.data.phonenumber2
    // })
    // var msg ={username:username, phonenumber:phonenumber};
    var msg = { username: username, telephone: phonenumber };
    var arr1=[];
    arr1.push(msg)
    store.set('key',arr1)
    wx.navigateBack({
      delta: 1
    })
  
  },
//  返回按钮
  navigateBack: function () {
    wx.navigateBack({
      delta: 1
    })
  }
// 结束
})