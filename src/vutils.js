const useragent = require('express-useragent');
const crypto = require('crypto');
const vcheck = require('./vcheck');

const fn = {};
module.exports = fn;

// 亂數產生字串
fn.randomStr = (length = 10, addchars = '') => {
  let allowstr = '';
  for (let i = 0; i < 26; i += 1) {
    allowstr += String.fromCharCode(97 + i);
    allowstr += String.fromCharCode(65 + i);
  }
  allowstr += `0123456789${addchars}`;
  let id = '';
  while (id.length < length) {
    const ra = Math.floor(Math.random() * allowstr.length);
    id += allowstr.substr(ra, 1);
  }
  return id;
};

// 依照timestamp+亂數產生字串
fn.newID = (length = 15) => {
  let len = length < 15 ? 15 : length;
  const timestamp = new Date().getTime().toString(16);
  len -= timestamp.length;
  const rand = fn.randomStr(len);
  return `${timestamp}${rand}`;
};

fn.md5 = (str) => {
  const newstr = vcheck.str(str);
  if (newstr === '') return '';
  const md5 = crypto.createHash('md5');
  return md5.update(newstr).digest('hex');
};

fn.replaceAll = (str, search, replace) => str.replace(new RegExp(search, 'g'), replace);

// 將敏感資料中間的字元用o取代
fn.hashName = (param, replace = '○') => {
  const str = vcheck.str(param);
  if (str === '') return '';
  if (str.length <= 2) return `${str.substr(0, 1)}${replace}`;
  const cut = Math.floor(str.length / 3);
  let bstr = str.substr(0, cut);
  const estr = str.substr(str.length - cut);
  while (bstr.length + estr.length < str.length) {
    bstr += replace;
  }
  bstr += estr;
  return bstr;
};

// 將email@之後的字元用o取代
fn.hashEmail = (param, replace = '○') => {
  const str = vcheck.str(param);
  if (!vcheck.email(str)) return '';
  const sarray = str.split('@');
  const cut = Math.ceil(sarray[0].length / 3);
  let out = sarray[0].substr(0, (sarray[0].length - cut));
  for (let i = 0; i < cut; i += 1) {
    out += replace;
  }
  out += '@';
  out += fn.hashName(sarray[1], replace);
  return out;
};

fn.clientIP = (req) => {
  const ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;
  return ip.split(',')[0];
};

fn.useragent = (req) => {
  const uagent = useragent.parse(req.headers['user-agent']);
  uagent.ip = fn.clientIP(req);
  return uagent;
};

fn.datesBetween = (startDate, endDate) => {
  const dates = [];
  const eDate = vcheck.luxon(endDate);
  let dateCursor = vcheck.luxon(startDate);
  while (dateCursor <= eDate) {
    dates.push(dateCursor.toFormat('yyyy-MM-dd'));
    dateCursor = dateCursor.plus({ days: 1 });
  }
  return dates;
};
