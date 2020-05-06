import { formatWith } from './format';


/**
 * SimpleDateFormat is a concrete class for formatting dates.
 * It allows for formatting (date -> text) like "yyyyMMdd HHmmss SSS"
 *
 * MIT License
 *
 * @author Tom Misawa (riversun.org@gmail.com,https://github.com/riversun)
 */
export default class SimpleDateFormat {

  /**
   *
   * @param format
   *
   * yyyy:year
   * MM,M:month
   * dd,d:date
   * HH,H:hours (0-23)
   * hh,h:hours (1-12)
   * a:AM,PM
   * mm,m:minutes
   * ss,s:seconds
   * SSS:milliseconds
   * '[something]':escape string by ''
   *
   * @param days
   */
  constructor(format, days) {

    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.formatStr = format;
  }

  /**
   * Set names of day of week
   *
   * @param days
   * @returns {SimpleDateFormat}
   */
  setDays(days) {
    if (!days) {
      throw Error('days not specified');
    }
    if (!Array.isArray(days)) {
      throw Error('days must be an array.');
    }
    if (days.length != 7) {
      throw Error('days array size must be 7.');
    }
    this.days = days;
    return this;
  }

  setMonths(months) {
    if (!months) {
      throw Error('months not specified');
    }
    if (!Array.isArray(months)) {
      throw Error('months must be an array.');
    }
    if (months.length != 12) {
      throw Error('months array size must be 12.');
    }
    this.months = months;
    return this;
  }

  /**
   * format date
   * @param date
   */
  format(date) {
    return formatWith(this.formatStr, date, {
      days: this.days,
      months: this.months
    });
  }

  /**
   * format date with formatString
   *
   * @param formatStr
   * yyyy:year
   * MM,M:month
   * dd,d:date
   * HH,H:hours (0-23)
   * hh,h:hours (1-12)
   * a:AM,PM
   * mm,m:minutes
   * ss,s:seconds
   * SSS:milliseconds
   * '[something]':escape string by ''
   *
   * @param date
   */
  formatWith(formatStr, date, opt) {
    if (typeof opt === 'undefined') {
      return formatWith(formatStr, date, {
        days: this.days,
        months: this.months
      });
    } else {
      return formatWith(formatStr, date, opt);
    }
  }

}
