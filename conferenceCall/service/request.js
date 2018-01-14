import store from './store.js'
import { getWxCode, getOpenId, getToken} from './promise.js'

function Request () {}
Request.prototype.get = function (obj) {
    var _obj = obj || {};
    wx.request({
        url: _obj.url,
        data: _obj.data,
        method: 'GET',
        success: function (res) {
            if (typeof _obj.success === 'function') {
                return _obj.success(res);
            }
        },
        fail: function (err) {
            if (typeof _obj.error === 'function') {
                return _obj.error(err);
            }
        }
    })
}
Request.prototype.post = function (obj) {
    const _this = this;
    const token = store.get('token');
    const requestData = obj.data || {};
    requestData.token = token;
    wx.request({
        url: obj.url,
        data: requestData,
        method: 'POST',
        success: function (res) {
            if (res.statusCode == 400 && res.data === 'invalid token') {
                /* 获取token */
                const openId = store.get('openId');

                if (openId) {
                    return getToken(openId).then(function (_res) {
                        const _data = _res.data;
                        if (_data.code == 0) {
                            store.set('token', _data.token);
                            store.set('refreshToken', _data.refreshToken);
                            return new _this.post(obj);
                        }
                    })
                } else {
                    return getWxCode().then(function (response) {
                        console.log(response)
                        const code = response;
                        return getOpenId(code)
                    }).then(function (response) {
                        const openId = response.data.openid;
                        store.set('openId', openId);
                        return getToken(openId)
                    }).then(function (response) {
                        const _data = response.data;
                        if (_data.code == 0) {
                            store.set('token', _data.token);
                            // console.log('_data.token')
                            store.set('refreshToken', _data.refreshToken);
                            console.log('ssdsfdsfdsfsdfsdfsdfds');
                            return new _this.post(obj);
                        }
                    })
                }
            }
            if (typeof obj.success === 'function') {
                return obj.success(res);
            }
        },
        fail: function (err) {
            if (typeof obj.error === 'function') {
                return obj.error(err);
            }
        }
    })
}
const request = new Request();
module.exports = {
    request: request
}