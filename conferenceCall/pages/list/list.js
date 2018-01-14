//index.js
var app = getApp()
import { request } from '../../service/request.js'
import api from '../../service/api.js'
Page({
    data: {
        meetings: [],
        holdMeeting: [],
        list: [
            { title: 'zoom' }
        ],
        delBtnWidth: 330,    //删除按钮宽度单位（rpx）
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
        const _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        request.post({
            url: api.getConfs,
            data: {},
            success: function (res) {
                const data = res.data;
                console.log(data);
                if (data.code == 0) {
                    var arr = [];
                    var tempMeetings = data.data.meetings;
                    for (var i = 0; i < tempMeetings.length; i ++ ) {
                        console.log(tempMeetings[i].infos);
                        arr = arr.concat(tempMeetings[i].infos);
                    }
                
                    const meetings = arr.filter(function (item, index, arr) {
                        item.left = 'margin-left: 0px';
                        return arr;
                    })
                    console.log(arr);
                    const holdMeeting = data.data.holdmeeting
                    console.log(meetings);
                    _this.setData({
                        meetings: meetings,
                        holdMeeting: holdMeeting
                    })
                    wx.hideLoading();
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
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
            var meetings = this.data.meetings;
            if (index != "" && index != null) {
                meetings[parseInt(index)].left = left;

                this.setData({
                    meetings: meetings
                })
                console.log(this.data.meetings);
            }
        }
    },

    touchE: function (e) {
        var index = e.currentTarget.dataset.index;
        if (e.changedTouches.length == 1) {
            var endX = e.changedTouches[0].clientX;
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
            var meetings = this.data.meetings;
            if (index !== "" && index != null) {
                meetings[parseInt(index)].left = left;
                this.setData({
                    meetings: meetings
                })
            }
        }
    },
    delItem: function (e) {
        var index = e.currentTarget.dataset.index;
        var list = this.data.list;
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    list.splice(index, 1);
                    _this.setData({
                        list: list
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        
    }
})
