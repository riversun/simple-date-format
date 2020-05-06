import { default as SafeReplacer } from './safe-replacer.js';

export function formatWith(formatStr, date, opts) {

  if (!date) {
    date = new Date();
  }

  opts = opts || {};

  let _days = opts.days;

  if (!_days) {
    _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  let _months = opts.months;

  if (!_months) {
    _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  const pad = (number, strDigits, isUnpad) => {
    const strNum = Math.abs(number).toString();
    if (!isUnpad && strNum.length > strDigits.length) {
      return strNum;
    } else {
      return ('0000' + strNum).slice(-strDigits.length);
    }
  };

  const timezone = (date, letter) => {
    const chunk = [];
    const offset = -date.getTimezoneOffset();
    chunk.push(offset === 0 ? 'Z' : offset > 0 ? '+' : '-');//add Z or +,-
    if (offset === 0) return chunk;
    chunk.push(pad(Math.floor(offset / 60), '00'));//hour
    if (letter === 'X') return chunk.join('');
    if (letter === 'XXX') chunk.push(':');
    chunk.push(pad((offset % 60), '00'));//min
    return chunk.join('');
  };

  const DELIM = '\0\0';
  const escapeStack = [];

  const escapedFmtStr = formatStr.replace(/'.*?'/g, m => {
    escapeStack.push(m.replace(/'/g, ''));
    return `${DELIM}${escapeStack.length - 1}${DELIM}`;
  });

  const rep = new SafeReplacer(escapedFmtStr);
  const formattedStr = rep
    .replace(/y{4}|y{2}/g, m => pad(date.getFullYear(), m, true))
    .replace(/M{3}/g, m => _months[date.getMonth()])
    .replace(/M{1,2}/g, m => pad(date.getMonth() + 1, m))
    .replace(/d{1,2}/g, m => pad(date.getDate(), m))
    .replace(/H{1,2}/g, m => pad(date.getHours(), m))
    .replace(/h{1,2}/g, m => {
      const hours = date.getHours();
      return pad(hours === 0 ? 12 : hours > 12 ? hours - 12 : hours, m);
    })
    .replace(/a{1,2}/g, m => date.getHours() >= 12 ? 'PM' : 'AM')
    .replace(/m{1,2}/g, m => pad(date.getMinutes(), m))
    .replace(/s{1,2}/g, m => pad(date.getSeconds(), m))
    .replace(/S{3}/g, m => pad(date.getMilliseconds(), m))
    .replace(/[E]+/g, m => _days[date.getDay()])
    .replace(/[Z]+/g, m => timezone(date, m))
    .replace(/X{1,3}/g, m => timezone(date, m))
    .build()
    .getString();

  const unescapedStr = formattedStr.replace(new RegExp(`${DELIM}\\d+${DELIM}`, 'g'),
    m => {
      const unescaped = escapeStack.shift();
      return unescaped.length > 0 ? unescaped : '\'';
    });

  return unescapedStr;
}
