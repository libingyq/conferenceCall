import api from '../../service/api.js';
import { getWxCode, getStorage, getToken, getOpenId, checkBind } from '../../service/promise.js';
import store from '../../service/store.js'
import { request } from '../../service/request.js'
// pages/checkStatus/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
        const _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        const token = store.get('token');
        if (!token) {
            return getWxCode().then(function (res) {
                var code = res;
                return getOpenId(code);
            }).then(function (res) {
                var openId = res.data.openid;
                return checkBind(openId)
            }).then(function (res) {
                var code = res.data.code;
                if (code != 0) {
                    wx.redirectTo({
                        url: './../../pages/bindUser/bindUser',
                    })
                } else {
                    console.log(res);
                    var openId = res.openId;
                    /* 获取token */
                    return getToken(openId);
                }
            }).then(function (res) {
                console.log(res);
                const data = res.data;
                if (data.code == 0) {
                    store.set('token', data.token);
                    store.set('refreshToken', data.refreshToken);
                    wx.switchTab({
                        url: '../../pages/meeting/meeting',
                    })
                }
            })
      } else {
            wx.switchTab({
                url: '../../pages/meeting/meeting',
            })
      }
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