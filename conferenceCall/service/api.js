const host = 'http://39.106.148.118:8080';
module.exports = {
    getOpenId: 'https://api.weixin.qq.com/sns/jscode2session',
    login: host + '/l/login/',
    sockerUrl: host + '/cc/', /* params: token, sid, id, billingCode */
    checkBind: function (openId) {
        return host + '/u/getUser/' + openId;
    }, /* params: openId */
    userBind: host + '/u/bind/', /* params: openId, username, password */
    getToken: function (openId) {
        return host + '/u/getToken/' + openId;
    } , /* params: openId */
    getRefreshToken: host + '/u/refreshToken/', /* params: openId, token, refreshToken */
    getContacts: host + '/u/getContact',
    getConfs: host + '/u/getConfs',
    scheduleConf: host + '/u/scheduleConf',
}