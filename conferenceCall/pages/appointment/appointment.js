// pages/appointment/appointment.js
// pages/leftSwiperDel / index.js
//index.js
//请求后台预约会议的信息
import { request } from '../../service/request.js'
import api from '../../service/api.js'
import store from '../../service/store.js'
var app = getApp()
Page({
    data: {
        date: '2017-1-1',
        time: '09:20',
        array: [4, 5, 6, 7],
        index: 0,
        // past
        // list: [
        //     { title: 'zoom' }
        // ],
        delBtnWidth: 290,    //删除按钮宽度单位（rpx）
        // past
        // selectedUsers:[],
        // now
        // selectedUsers: [{ username: "aa", phonenumber: "11" }, { username: "bb", phonenumber: "22"}],
        selectedUsers:[],
        confName:'',
        duration:'',
        startTime:'',  
    },
     
    bindconfNameInput:function(e){
      this.setData({
        confName: e.detail.value
      })   
     console.log(this.data.confName)
    },
    bindDurationInput: function (e) {
      this.setData({
        duration: e.detail.value
      })
      // console.log(this.data.duration)
    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindTimeChange: function (e) {
      this.setData({
        time: e.detail.value
      })
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
    onLoad: function () {
        this.initEleWidth();        
    },
    // 预约会议-后台请求信息-self
    onShow:function(){
      // 修改请求回来的数据为需要的数据格式
      var usersAll=store.get('key2');
      usersAll.forEach(function (item) {
      // item.mailListId=item.userid;
      item.mailListId=JSON.stringify(item.userid);
      delete item.userid;
      item.partyRole = '1';
      })
      this.data.selectedUsers = usersAll.concat(this.data.selectedUsers)
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
      wx.showLoading({
        title: '加载中...',
      })
      request.post({
        url: api.scheduleConf,
        data: {
         confName: this.data.confName,
         startTime: this.data.date +' '+this.data.time+':00',
         duration: this.data.duration,
        //  现在已经是JSON格式的数组，不再需要用JSON.stringify进行转义；
         selectedUsers: this.data.selectedUsers
        },
        success: function (res) {
          const _data = res.data;
          console.log(_data);
          if (_data.code == 0) {
          }
          wx.hideLoading();
        },
        error: function (err) {
          console.log(err);
        }
      })
    },
    //结束
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
            if (index != "" && index != null) {
              selectedUsers[parseInt(index)].left = left;
                this.setData({
                  selectedUsers: selectedUsers
                })
                // console.log(this.data.selectedUsers);
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

    navigateToPreview: function () {
      var date = Date.parse(new Date) + 1800000
      var chooseDate = Date.parse(new Date(this.data.date + ' ' + this.data.time + ':00'))
      if (chooseDate >= date && this.data.confName!=''&& this.data.duration!=''){
        wx.navigateTo({
          url: '../appointment_confirm/appointment_confirm?confName=' + this.data.confName + "&date=" + this.data.date + "&time=" + this.data.time
        })
      }else{
        wx.showToast({
          title: '会议信息有误',
          icon: 'loading',
          duration: 2000
        })
      } 
      store.set('key3', this.data.selectedUsers)   
    }
})