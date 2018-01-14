/* store */
function Store() {}
/* 存储数据 */
Store.prototype.set = function (key, data, expires) {
    if (expires) {
        var _date = new Date();
        var _time = date.getTime();
        var _expires = _date + expires * 1000;
        var _data = {
            expires: _expires
        }
        _data[key] = data;
        try {
            wx.setStorageSync(key, _data);
            return true
        } catch (err) {
            return false
        }
    } else {
        var _data = {};
        _data[key] = data;
        try {
            console.log(_data);
            wx.setStorageSync(key, _data);
            return true
        } catch (err) {
            return false;
        }
    }
}
/* 获取数据 */
Store.prototype.get = function (key) {
    const _data = wx.getStorageSync(key);
    if (!_data) {
        return;
    }
    if (_data.expires) {
        const _expires = _data.expires;
        const _date = new Date();
        const _time = _date.getTime();
        if (_time >= _expires) {
            /* 数据过期 */
            return null;
        }
        return _data[key];
    }
    return _data[key];
}
/* 清除本地缓存 */
Store.prototype.clear = function () {
    return wx.clearStorageSync();
}
/* 删除指定缓存 */
Store.prototype.remove = function (key) {
    return wx.removeStorageSync(key);
}
/* 判断对象是不是数组 */
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
/* 判断是不是json */
function isJson(obj) {
    var isjson = typeof (obj) == "object" 
    && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

const store = new Store();
module.exports = store;