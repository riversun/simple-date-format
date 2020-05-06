# simple-date-format
[![npm version](https://badge.fury.io/js/%40riversun%2Fsimple-date-format.svg)](https://badge.fury.io/js/%40riversun%2Fsimple-date-format)
[![CircleCI](https://circleci.com/gh/riversun/simple-date-format/tree/master.svg?style=shield)](https://circleci.com/gh/riversun/simple-date-format/tree/master)
[![codecov](https://codecov.io/gh/riversun/simple-date-format/branch/master/graph/badge.svg)](https://codecov.io/gh/riversun/simple-date-format)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/469533898ebe429690ad4c508634fad7)](https://app.codacy.com/manual/riversun/simple-date-format?utm_source=github.com&utm_medium=referral&utm_content=riversun/simple-date-format&utm_campaign=Badge_Grade_Dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Simple Date Formater for JavaScript.
It allows for formatting date → text .

You can easily format date with specific patterns like as follows.

`yyyyMMdd'T'HHmmssXX` → `20180717T120856+0900`

**[live demo is here](https://riversun.github.io/simple-date-format)**

# install 

### use node.js/npm

install module

```
npm install @riversun/simple-date-format
```   

**import**  module
 
```javascript
import SimpleDateFormat from "@riversun/simple-date-format";

```

or 

**require** module 

```javascript 1.8
const SimpleDateFormat = require('@riversun/simple-date-format');

``` 

### use with **\<script\>tag**  from CDN 

```html
<script src="https://cdn.jsdelivr.net/npm/@riversun/simple-date-format@1.1.2/lib/simple-date-format.js"></script>
```

# usage

```javascript 1.8
const date = new Date('2018/07/17 12:08:56');
const sdf = new SimpleDateFormat();
console.log(sdf.formatWith("yyyy-MM-dd'T'HH:mm:ssXXX", date));//to be "2018-07-17T12:08:56+09:00"
```     

```javascript 1.8
const date = new Date('2018/07/17 12:08:56');
const sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
console.log(sdf.format(date));//to be "2018-07-17T12:08:56+09:00"
```

# Pattern of the date
The following examples show how date and time patterns are interpreted.
The given date and time are 2018-07-17 12:08:56 local time in Tokyo/Japan time zone.

<table>
 <tr>
  <td>Letter(s)</td>
  <td>Date or Time Component</td>
  <td>Examples</td>
 </tr>
 <tr>
  <td>yyyy</td>
  <td>Year</td>
  <td>2018</td>
 </tr>
 <tr>
  <td>yy</td>
  <td></td>
  <td>18</td>
 </tr>
 <tr>
  <td>M</td>
  <td>Month in year</td>
  <td>7</td>
 </tr>
 <tr>
  <td>MM</td>
  <td></td>
  <td>07</td>
 </tr>
 <tr>
  <td>MMM</td>
  <td>Month name</td>
  <td>Jul</td>
 </tr>
 <tr>
  <td>d</td>
  <td>Day in month</td>
  <td>17</td>
 </tr>
 <tr>
  <td>dd</td>
  <td></td>
  <td>17</td>
 </tr>
 <tr>
  <td>a</td>
  <td>Am/pm marker</td>
  <td>PM</td>
 </tr>
 <tr>
  <td>H</td>
  <td>Hour in day (0-23)</td>
  <td>12</td>
 </tr>
 <tr>
  <td>HH</td>
  <td></td>
  <td>12</td>
 </tr>
 <tr>
  <td>E</td>
  <td>day of week</td>
  <td>Tue</td>
 </tr>
 <tr>
  <td>h</td>
  <td>Hour in am/pm (1-12)</td>
  <td>12</td>
 </tr>
 <tr>
  <td>hh</td>
  <td></td>
  <td>12</td>
 </tr>
 <tr>
  <td>m</td>
  <td>Minute in hour</td>
  <td>8</td>
 </tr>
 <tr>
  <td>mm</td>
  <td></td>
  <td>08</td>
 </tr>
 <tr>
  <td>s</td>
  <td>Second in minute</td>
  <td>56</td>
 </tr>
 <tr>
  <td>ss</td>
  <td></td>
  <td>56</td>
 </tr>
 <tr>
  <td>SSS</td>
  <td>Millisecond</td>
  <td>789</td>
 </tr>
 <tr>
  <td>Z</td>
  <td>Timezone(RFC822)</td>
  <td>+0900</td>
 </tr>
 <tr>
  <td>X</td>
  <td>Timezone(ISO8601)</td>
  <td>+09</td>
 </tr>
 <tr>
  <td>XX</td>
  <td></td>
  <td>+0900</td>
 </tr>
 <tr>
  <td>XXX</td>
  <td></td>
  <td>+09:00</td>
 </tr>
 <tr>
  <td>' '</td>
  <td>Strings(Escaped)</td>
  <td></td>
 </tr>
 <tr>
  <td>''</td>
  <td>Single Quote</td>
  <td></td>
 </tr>
</table>

# Examples

<table>
 <tr>
  <td>Format String</td>
  <td>Example</td>
 </tr>
 <tr>
  <td>yyyyMMdd'T'HHmmssXX<br>(ISO 8601)</td>
  <td>20180717T120856+0900</td>
 </tr>
 <tr>
  <td>yyyy-MM-dd'T'HH:mm:ssXXX<br>(ISO 8601)</td>
  <td>2018-07-17T12:08:56+09:00</td>
 </tr>
 <tr>
  <td>E, dd MMM yyyy HH:mm:ss Z</td>
  <td>Tue, 17 Jul 2018 12:08:56 +0900</td>
 </tr>
 <tr>
  <td>yyyy.MM.dd 'at' hh:mm:ss Z</td>
  <td>2018.07.17 at 12:08:56 +0900</td>
 </tr>
 <tr>
  <td>EEE, MMM d, ''yy</td>
  <td>Tue, Jul 17, '18</td>
 </tr>
 <tr>
  <td>h:mm a</td>
  <td>12:08 PM</td>
 </tr>
 <tr>
  <td>hh 'o''''clock' a, X</td>
  <td>12 o'clock PM, +09</td>
 </tr>
 <tr>
  <td>yyyy年M月d日 H時m分s秒</td>
  <td>2018年7月17日 12時8分56秒</td>
 </tr>
 <tr>
  <td>yyyy年MM月dd日 HH時mm分ss秒</td>
  <td>2018年07月17日 12時08分56秒</td>
 </tr>
 <tr>
  <td>yyyyMMddHHmmssSSS</td>
  <td>20180717120856789</td>
 </tr>
</table>


