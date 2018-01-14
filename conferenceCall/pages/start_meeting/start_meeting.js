// pages/appointment/appointment.js
// pages/leftSwiperDel / index.js
//index.js
import store from '../../service/store.js'
import { request } from '../../service/request.js'
import api from '../../service/api.js'
var app = getApp()
Page({
    data: {
        date: '2017-1-1',
        time: '9:20',
        array: [4, 5, 6, 7],
        index: 0,
        list: [
            { title: 'zoom' }
        ],
        delBtnWidth: 290,    //删除按钮宽度单位（rpx）  
        // now
        selectedUsers:[],
        
        // person:[]
        // 之前
        // username:'' ,
        // phonenumber:''
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
 * 生命周期函数--监听页面加载--self
 */
    onLoad: function(options){
        this.initEleWidth();
    
    },
    onReady:function(){
      store.remove('key');
    },
    
    // 监听页面显示，一上来数据就可以显示
    onShow:function(){
      // 联系人列表的选择项开始
      var startUsers=store.get('key2');
      // 修改为后台需要的数据格式
      startUsers.forEach(function (item) {
        // item.mailListId=item.userid;
        item.mailListId = JSON.stringify(item.userid);
        delete item.userid;
        item.partyRole = '1';
      })
      this.data.selectedUsers = startUsers.concat(this.data.selectedUsers)
      // usersAll数组去重
      var hash = {};
      this.data.selectedUsers = this.data.selectedUsers.reduce(function (item, next) {
        hash[next.mailListId] ? '' : hash[next.mailListId] = true && item.push(next);
        return item
      }, [])
      // console.log(this.data.selectedUsers);
      //数组去重结束
      const _this = this;
      _this.setData({
        selectedUsers: this.data.selectedUsers

      })
      // --- 联系人列表的选择项结束
      // console.log(startUsers)
      // 手动添加的用户；
      // 暂时去掉
      // var infoHand=store.get('key');
      // 后台需要的是名字是telephone;
      // infoHand.forEach(function(item){
      //   item.telephone = item.phonenumber;
      //   delete item.phonenumber
      // })
     // console.log(infoHand)
     // this.data.selectedUsers = infoHand.concat(this.data.selectedUsers)
        // var that = this
      _this.setData({
          selectedUsers: this.data.selectedUsers
        })
        console.log(this.data.selectedUsers)
    },
    
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            });
        }
    },
    touchM: function (e) {
        var index = e.currentTarget.dataset.index;

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
            // var list = this.data.list;
            // if (index != "" && index != null) {
            //     list[parseInt(index)].left = left;
            //     this.setData({
            //         list: list
            //     })
            //     console.log(this.data.list);
            // }
            var selectedUsers = this.data.selectedUsers;
            if (index != "" && index != null) {
                selectedUsers[parseInt(index)].left = left;
                this.setData({
                    selectedUsers: selectedUsers
                })
                console.log(this.data.selectedUsers);
            }
        }
       
    },

    // touchE: function (e) {
    //     console.log('0000')
    //     var index = e.currentTarget.dataset.index;
    //     if (e.changedTouches.length == 1) {
    //         var endX = e.changedTouches[0].clientX;
    //         var disX = this.data.startX - endX;
    //         var delBtnWidth = this.data.delBtnWidth;
    //         //如果距离小于删除按钮的1/2，不显示删除按钮
    //         var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
    //         var list = this.data.list;
    //         console.log(left);
    //         console.log('------------')
    //         if (index !== "" && index != null) {
    //             list[parseInt(index)].left = left;
    //             this.setData({
    //                 list: list
    //             })
    //         }
    //     }
    // },
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
    // delItem: function (e) {
    //     var index = e.currentTarget.dataset.index;
    //     var list = this.data.list;
    //     var _this = this;
    //     wx.showModal({
    //         title: '提示',
    //         content: '这是一个模态弹窗',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击确定');
    //                 list.splice(index, 1);
    //                 _this.setData({
    //                     list: list
    //                 })
    //             } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //             }
    //         }
    //     })
    // },
     delItem: function (e) {
        var index = e.currentTarget.dataset.index;
        var selectedUsers = this.data.selectedUsers;
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
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
    deleteBuffer:function(e){
       store.remove('key')
    },
    /* 导航到会控页面 */
    navitateToMeetingControl: function () {
        wx.navigateTo({
            // url: '../meetingControl/meetingControl',
          url: '../meetingControl/meetingControl?selectedUsers='+JSON.stringify(this.data.selectedUsers)
        })

        // var openId=store.get('openId')
        // console.log(openId);
        // request.get({
        //   url: api.checkBind(openId),
        //   success: function (res) {
        //   console.log(res.data)
        //   }
        // })
      
    },
    // 导航到开会页面
    navigateBack: function () {
      wx.navigateBack({
        delta: 1
      })
    }
})