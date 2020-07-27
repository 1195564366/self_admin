/*
 *@Description:缓存工具库
 *@Author: zhengff
 *@Date: 2019-04-21 22:57:38
*/
/**
 * 缓存
 * @type {Object}
 */
const CACHE = {
  isString: function (v) {
    return Object.prototype.toString.call(v) == "[object String]";
  },
  get: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  remove: function (key) {
    var res = this.get(key);
    localStorage.removeItem(key);
    return res;
  },
  clear: function () {
    localStorage.clear();
  }
}
export default CACHE;