// pages/inMeeting/inMeeting.js
import { request } from '../../service/request.js'
import api from '../../service/api.js'
import store from '../../service/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab: 0,
      selectedJoinUser:[],
      bc:''
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowThis=this
    var openId=store.get('openId')
        // console.log(openId);
        request.get({
          url: api.checkBind(openId),
          success: function (res) {
          // console.log(res.data)
          var billingCode = res.data.billingCode
          store.set('bc', billingCode)
         }
      })
      var bc=store.get('bc')
      nowThis.setData({
          bc: bc
      })
    // console.log(this.data.bc)
    var selectedUsers = JSON.parse(options.selectedUsers);
    var that=this
    that.setData({
      selectedJoinUser: selectedUsers
    })
    // console.log(this.data.selectedJoinUser)
    // 获取需要传入的数据；
    // 随机生成sid;
      var randomNum=(Math.random() * Date.now() / 1000000).toFixed(0);
      // console.log(randomNum)
      var token=store.get('token')
      var bc=store.get('bc')
      // console.log(token)
      // console.log(bc)
      var data={  
        token:token,
        bc:bc,
        id:'isActive',
        sid: randomNum
        }
      var socketOpen = false
      var socketMsgQueue= JSON.stringify(data)
      // console.log(socketMsgQueue);
      wx.connectSocket({
          url: 'ws://39.106.148.118:8080/cc',
          success: function (res) {
              console.log(res);
          },
          fail: function (err) {
              console.log(err)
          },
      })
      // 开始
      wx.onSocketOpen(function (res) {
          console.log(res)
          console.log('connected--WebSocket链接已打开')
          socketOpen=true
          console.log('数据发送中'+socketMsgQueue)
          sendSocketMessage(socketMsgQueue)
      })
      function sendSocketMessage(msg){
        if(socketOpen){
          wx.sendSocketMessage({
            data: msg
          })
        }else{
          socketMsgQueue.push(msg)
        }
      }
      wx.onSocketMessage(function(res){
        console.log(res)
      })
      //--------；
      wx.onSocketError(function (err) {
        console.log(err);
        console.log('error--WebSocket连接已经断开，请检查')
      })
      // -------结束

     
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
    var nowThis = this
    var openId = store.get('openId')
    // console.log(openId);
    // 获取激活会议的billingCode
    request.get({
      url: api.checkBind(openId),
      success: function (res) {
        console.log(res.data)
        var billingCode = res.data.billingCode
        store.set('bc', billingCode)
      }
    })
    var bc = store.get('bc')
    nowThis.setData({
      bc: bc
    })
    // console.log(this.data.bc)
    // var selectedUsers = JSON.parse(options.selectedUsers);
    // var that = this
    // that.setData({
    //   selectedJoinUser: selectedUsers
    // })
    // console.log(this.data.selectedJoinUser)
    // 获取需要传入的数据；
    // 随机生成sid;
    var randomNum = (Math.random() * Date.now() / 1000000).toFixed(0);
    console.log(randomNum)
    var token = store.get('token')
    var bc = store.get('bc')
    // console.log(token)
    // console.log(bc)
    var data = {
      token: token,
      bc: bc,
      id: 'activateConf',
      sid: randomNum
    }
    var socketOpen = false
    var socketMsgQueue = JSON.stringify(data)
    console.log(socketMsgQueue);
    wx.connectSocket({
      url: 'ws://39.106.148.118:8080/cc',
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err)
      },
    })
    // 开始
    wx.onSocketOpen(function (res) {
      console.log(res)
      console.log('connected--WebSocket链接已打开')
      socketOpen = true
      console.log('数据发送中' + socketMsgQueue)
      sendSocketMessage(socketMsgQueue)
    })
    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
    wx.onSocketMessage(function (res) {
      console.log(res)
    })
    //--------；
    wx.onSocketError(function (err) {
      console.log(err);
      console.log('error--WebSocket连接已经断开，请检查')
    })
      // -------结束
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
  showActionSheet: function () {
      wx.showActionSheet({
          itemList: ['添加参会人', '保存参会人列表', '结束会议'],
          itemColor: '#353535',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
  bindChange: function (e) {
      //console.log(e);
      this.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {

      var that = this;

      if (this.data.currentTab === e.target.dataset.current) {
          return false;
      } else {
          that.setData({
              currentTab: e.target.dataset.current
          })
      }
  }
})