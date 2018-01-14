import api from './api.js';
import auth from './../config/index.js';

/* 登录获取code */
function getWxCode() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res.code);
                }
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}
/* 通过微信code获取openId */
function getOpenId(code) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: api.getOpenId,
            data: {
                js_code: code,
                appid: auth.appId,
                secret: auth.secret,
                grant_type: 'authorization_code'
            },
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}
/* 获取token */
function getToken(openId) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: api.getToken(openId),
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}
/* 绑定用户 */
function bindUser(openId, email, password) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: api.userBind,
            data: {
                openId: openId,
                email: email,
                password: password
            },
            method: 'POST',
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}
/* 获取缓存信息 */
function getStorage(key) {
    return new Promise(function (resolve, reject) {
        wx.getStorage({
            key: key,
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}
/* 检查用户是否绑定 */
function checkBind(openId) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: api.checkBind(openId),
            method: 'GET',
            success: function (res) {
                res.openId = openId;
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}
/* 获取token */
function getStorageToken() {}
module.exports = {
    getWxCode,
    getOpenId,
    getToken,
    getStorage,
    bindUser,
    checkBind
}