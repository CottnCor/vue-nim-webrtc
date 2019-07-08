/*
 * 公共方法
 */

import Cookies from "js-cookie";
import { COOKIE_EXPIRES } from "@/config"; // cookie保存的天数

/**
 * @msg: 存取token
 * @param {string} key
 * @param {string} value
 */
export const setToken = (key: string, value: string) => {
  Cookies.set(key, value, { expires: COOKIE_EXPIRES || 1 });
};

/**
 * @param {string} key
 */
export const getToken = (key: string) => {
  const value = Cookies.get(key);
  if (value) {
    return value;
  } else {
    return null;
  }
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
  const keyValueArr = url.split("?")[1].split("&");
  let paramObj: any = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split("=");
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};

/**
 * 判断一个对象是否存在key
 * @param  {any} obj
 * @param  {string|number} key
 */
export const hasKey = (obj: any, key: string | number) => {
  if (key) {
    return key in obj;
  } else {
    const keysArr = Object.keys(obj);
    return keysArr.length;
  }
};

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date: any, fmt: string) => {
  let time = "";
  const o: any = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      time = time.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ("00" + o[k]).substr(String(o[k]).length)
      );
    }
  }
  return time;
};

/**
 * 校验手机号是否正确
 * @param phone 手机号
 */
export const verifyPhone = (phone: string | number) => {
  const reg = /^1[34578][0-9]{9}$/;
  const _phone = phone.toString().trim();
  let toastStr =
    _phone === ""
      ? "手机号不能为空~"
      : !reg.test(_phone) && "请输入正确手机号~";
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _phone
  };
};

/**
 * @param  {any} obj
 */
export function objClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function guid() {
  let length = 16;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * length) | 0;
    let v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(length);
  });
}
