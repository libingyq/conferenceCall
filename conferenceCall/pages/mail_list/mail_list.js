import { request } from '../../service/request.js'
import api from '../../service/api.js'
import store from '../../service/store.js'
// pages/mail_list/mail_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [
          { head: {
              name: 'sdfsdf',
              mobile: '45451212'
          }, 
          children: [
              { name: 'sdfsdf', mobile: '454615156' }
          ]}
      ],
      users:[],
      users1:[],
      isShow:false 
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
      /* 获取通讯录 */
      const _this = this;
      wx.showLoading({
          title: '加载中...',
      })
      request.post({
          url: api.getContacts,
          data: {},
          success: function (res) {
              console.log(res);
              const _data = res.data;
              if (_data.code == 0) {
                  const mailList = _data.data;
                  store.set('keyList',mailList)
                
                  // ----联系人列表的收缩
                  mailList.forEach(function (item) {
                    item.toggle = false
                  })
                  _this.setData({
                    // 数组里面两个大的对象；每个对象都是一个联系人列表；
                      list: mailList,
                      
                  })
                  //-联系人列表结束
                  wx.hideLoading();
                  
              }
          },
          error: function (err) {
              console.log(err);
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
  // 点击收缩联系人列表
  clickIcon: function (event) {
     console.log(event)
     let param={};
     let index=event.currentTarget.dataset.index,
      
         nowToggle=this.data.list[index].toggle,
         str='list['+index+'].toggle';
     param[str]=!nowToggle;
     this.setData(param);
    
    //添加属性checked，单个选择参会人
    this.data.list[index].users.forEach(function(item){
        item.checked=false;
    })
    // console.log(this.data.list[index].users)
  },
  // 联系组切换
  toggleGroup: function (event) {
      console.log(event)
      var index = event.currentTarget.dataset.index
      var list = this.data.list
      // 选中时true,没选中是false
      var isSelected = event.currentTarget.dataset.selected
      // console.log(isSelected)    
      // 而列表下面的每一项是选中为true,没选中为false；
     // 这是决定性的一步****
      list[index].selected = !isSelected; 
      // console.log(list[index].selected)
     // // 根据索引值选中每个列表下面的每一项是个数组
      const users = list[index].users;
        
      //这是选中的所有元素的数组；
       users.forEach(function (item, index) {
        // 为每一个item添加属性selected:true;
       item.selected =!isSelected;
          // console.log(item.selected)

      })
      this.setData({
          list: list,
          // users:users
      })
      if (list[index].selected==true){
        this.setData({
          users: users
        })   
      }else{
        this.setData({
          users: []
        }) 
      }
  },

  toggleItem:function(event){
    console.log(event)
    // 当前点击元素的索引
    var singleIndex=event.currentTarget.dataset.index;
    console.log(singleIndex)
    // 当前元素所在数组的id
    var listnumber=event.currentTarget.dataset.listnumber;
    // list是所有的数据数组；
    var list = this.data.list
    // 根据两个索引值获取到当前点击的元素
    var sigitem = list[listnumber].users[singleIndex];
    sigitem.checked = !sigitem.checked
    console.log(sigitem.checked) 
    // 设置一个空的数组去装当前点击的元素；
    // this.data.users1.push(sigitem)    
    // 超级超级重要的一步，如果没有这一步，就会出现只有toggleGroup才能改变它的图标样式
    this.setData({
      list: list 
    })
    if (sigitem.checked == true) {
      this.data.users1.push(sigitem);
      this.setData({
        users1: this.data.users1
      })
    }
    // past--
    // var isChecked = event.currentTarget.dataset.checked
    // console.log(isChecked)
    // sigitem.isChecked=!isChecked
    // console.log(sigitem.isChecked)
  },
  saveUser:function () {
    //将单个添加的列表和一起添加的组合在一起；
    this.data.users=this.data.users1.concat(this.data.users);
    console.log(this.data.users)
    store.set('key2',this.data.users)
    wx.navigateBack({
      delta: 1
    })
  }
})