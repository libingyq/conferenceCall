import { getWxCode, getOpenId, bindUser } from '../../service/promise.js'
import api from '../../service/api.js';
import utils from '../../utils/util.js';
// pages/bindUser/bindUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      email: '',
      password: ''
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
  
  },
  bindKeyInput: function (e) {
      console.log(e);
      var value = e.detail.value
      var pos = e.detail.cursor
      var inputType = e.currentTarget.dataset.type;
      if (pos != -1) {
          //光标在中间
          var left = e.detail.value.slice(0, pos)
          //计算光标的位置
          pos = left.replace(/11/g, '2').length
      }
      //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
      if (inputType === 'email') {
          this.setData({
              email: value
          })
      }
      if (inputType === 'password') {
          this.setData({
              password: value
          })
      } 
  },
  doBind: function () {
      var email = utils.trim(this.data.email);
      console.log(email)
      var password = utils.trim(this.data.password);
      //邮箱验证
      var patternPhone = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!patternPhone.test(email)) {
          return wx.showModal({
              title: '提示',
              content: '请输入正确的邮箱地址',
              showCancel: false,
              confirmColor: '#5996ad'
          })
      }
      if (!password) {
          return wx.showModal({
              title: '提示',
              content: '请输入密码',
              showCancel: false,
              confirmColor: '#5996ad'
          })
      }
      getWxCode().then(function (res) {
          console.log(res);
          return getOpenId(res)
      }).then(function (res) {
          var openId = res.data.openid;
          return bindUser(openId, email, password);
      }).then(function (res) {
          console.log(res);
          console.log('success');
          var code = res.data.code;
          if (code != 0) {
            return wx.showModal({
                title: '提示',
                content: '绑定失败',
                showCancel: false
            })
          }
          wx.showToast({
              title: '绑定成功',
              success: function () {
                  wx.redirectTo({
                      url: '../../pages/checkStatus/checkStatus',
                  })
              }
          })
      }).catch(function (err) {
          console.log(err);
      })
  }
})