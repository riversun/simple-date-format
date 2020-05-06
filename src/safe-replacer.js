/**
 SafeReplacer

 Replacement utility class that does not use the previous replacement string
 for the next replacement even if it is replaced consecutively by chaining replace like .replace().replace()...

 For example:
 - Substitution with the "USUAL" approach
 console.log("His name is AAA.mm is a nice guy.".replace(/AAA/g,'Tommy').replace(/mm/g,'Jack'));
 -> His name is ToJacky.Jack is a nice guy.".replace(/AAA/g,'Tommy')

 - Replacing using "SafeReplacer"
 console.log(new SafeReplacer('His name is AAA.mm is nice guy.').replace(/AAA/g,'Tommy').replace(/mm/g,'Jack').build().getString());
 -> His name is Tommy.Jack is a nice guy.
 (There is an "mm" in Tommy, but Tommy is marked as a "REPLACED" string,
 so the string "Tommy" will not be replaced in the next replacement)

 * MIT License
 *
 * @author Tom Misawa (riversun.org@gmail.com,https://github.com/riversun)
 */
export default class SafeReplacer {
  constructor(str, opt) {
    this.opt = opt ? opt : {};
    this.str = str;
    this.escapeStack = [];
    this.DELIM_ESCAPER_PREFIX = '<#<#<#';
    this.DELIM_ESCAPER_SUFFIX = '#>#>#>';
    this.DELIM_CONSUMED = '#-#-#-';

    if (this.opt.escaperPrefix) {
      this.DELIM_ESCAPER_PREFIX = opt.escaperPrefix;
    }
    if (this.opt.escaperSuffix) {
      this.DELIM_ESCAPER_SUFFIX = opt.escaperSuffix;
    }
    if (this.opt.consumedDelimiter) {
      this.DELIM_CONSUMED = opt.consumedDelimiter;
    }
    if (this.str.indexOf(this.DELIM_ESCAPER_PREFIX) >= 0 ||
      this.str.indexOf(this.DELIM_ESCAPER_SUFFIX) >= 0 ||
      this.str.indexOf(this.DELIM_CONSUMED) >= 0) {

      throw Error(`Replacement may not be possible 
      because the target string contains the prefix and suffix strings used in the replacement process.
Specify three options, escaperPrefix, escaperSuffix, and consumedDelimiter, as a large argument to the constructor.
`);
    }

    this.regSearchConsumed = new RegExp(`${this.DELIM_CONSUMED}.*?${this.DELIM_CONSUMED}`, 'g');
    this.regEraseConsumed = new RegExp(`${this.DELIM_CONSUMED}`, 'g');
    this.regSearchEscaper = new RegExp(`${this.DELIM_ESCAPER_PREFIX}\\d+${this.DELIM_ESCAPER_SUFFIX}`, 'g');
    this.regEraseEscaperPrefix = new RegExp(`${this.DELIM_ESCAPER_PREFIX}`, 'g');
    this.regEraseEscaperSuffix = new RegExp(`${this.DELIM_ESCAPER_SUFFIX}`, 'g');
  }

  getString() {
    return this.str;
  }

  build() {
    this.doEscape();
    this.doUnescape();
    this.escapeStack = [];
    return this;
  }

  doEscape() {
    const escapedFmtStr = this.str.replace(this.regSearchConsumed, m => {
      this.escapeStack.push(m.replace(this.regEraseConsumed, ''));
      return `${this.DELIM_ESCAPER_PREFIX}${this.escapeStack.length - 1}${this.DELIM_ESCAPER_SUFFIX}`;
    });
    this.str = escapedFmtStr;
  }

  doUnescape() {

    const unescapedStr = this.str.replace(this.regSearchEscaper,
      (m) => {
        const num = new Number(m.replace(this.regEraseEscaperPrefix, '').replace(this.regEraseEscaperSuffix, ''));
        const unescaped = this.escapeStack[num];
        return unescaped.length > 0 ? unescaped : '';
      });
    this.str = unescapedStr;
  }

  replace(searchValue, replacer) {
    this.doEscape();
    this.str = this.str.replace(searchValue, (m) => {
      if (replacer) {
        if (typeof replacer === 'string') {
          return `${this.DELIM_CONSUMED}${replacer}${this.DELIM_CONSUMED}`;
        } else if (typeof replacer === 'function') {
          return `${this.DELIM_CONSUMED}${replacer(m)}${this.DELIM_CONSUMED}`;
        } else {
          throw Error(`Invalid replacer. replacer="${replacer}"`);
        }
      }
      return m;
    });
    return this;
  }
}
