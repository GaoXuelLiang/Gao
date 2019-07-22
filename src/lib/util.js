


//设置Cookie
export const setCookie = (name, value) => {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' +
      exp.toGMTString() + '; path=/';
};
//获取cookie
export const getCookie = (name) => {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
};