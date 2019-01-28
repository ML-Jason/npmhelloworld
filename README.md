[![Build Status](https://travis-ci.org/ML-Jason/ml.valuetool.svg?branch=master)](https://travis-ci.org/ML-Jason/ml.valuetool)
[![Coverage Status](https://coveralls.io/repos/github/ML-Jason/ml.valuetool/badge.svg?branch=master)](https://coveralls.io/github/ML-Jason/ml.valuetool?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ml.valuetool
包含了vcheck、vutils兩個功能。
## vcheck
建構於[validator.js](https://github.com/chriso/validator.js)之上。
針對參數的驗證，擴充(或簡化)了一些function。
> 原本validator.js的功能完整的被vcheck繼承，因此仍然可以透過vcheck使用。

* str(val):String

  將傳入參數轉成String，並去掉前後空白(trim)

* alphanumeric(val):String

  確認是否為英數組成的字串，若不是，則回傳空字串
  
* normalStr(val):String
  
  只允許英數、以及_@.-

* number(val):Number
  
  將傳入值轉成數字，失敗則回傳NaN

* email(val):String
  
  確認是否為email，失敗則回傳空字串

* mongoID(val):String

  確認是否為mongoID格式，失敗則回傳空字串

* url(val):String
  
  確認是否為url格式，失敗則回傳空字串。可允許*符號，但只限於使用在第一層sub-domain

* boolean(val):Boolean

  除了1或'1'或true，其餘都返回false

* luxon(val, fmt):DateTime

  將物件或字串轉成luxon的DateTime格式，可傳入JS Date或是字串(yyyy-MM-dd)，如果傳入的字串不是預設的yyyy-MM-dd，則可以藉由第二個參數fmt來自訂格式。

* json(val):Object

  將物件或字串藉由json轉換成新物件，如果失敗，則回傳null

* array(val):Array

  將物件或字串藉由json轉換成新Array，如果失敗，則回傳null

* escapeRegex(val):String

  將字串裡的特定字元escape以供正常的regexp使用

* escape(val):String

  replace <, >, &, ', " and / with HTML entities

## vutils
提供一些常用的變數轉換(產生)功能。

* randomStr(length:Number=10, addChars:String):String
  
  產生亂數字串(預設為英數，區分大小寫)。
  length為字串長度，預設為10。
  addChars為除了英數以外要加入的字元，以字串的形式串起來。

* newID(length:Number=15):String

  依據timestamp產生字串。
  length為字串長度，預設是15。
  字串開頭為timestamp轉成16進位字串，未滿length的長度則由randomStr補足。

* md5(val:String):String

  把字串md5編碼

* replaceAll(str:String, search:String, replace:String):String
  
  將str裡符合search的所有字串取代成replace。

* hashName(str:String, replace:String='○'):String
  
  把str中間(1/3長度)的字元取代成replace。

* hashEmail(str:String, replace:String='○'):String

  類似hashName()，把email進行hash。

* clientIP(req:Object):String

  傳入express的req物件，解析user的IP。

* useragent(req:Object):Object
  
  傳入express的req物件，解析user的useragent。
  回傳物件為[express-useragent](https://github.com/biggora/express-useragent)物件。擴充了解析IP的功能(express-useragent並沒有解析IP)，存放在ip這個屬性裡。

* datesBetween(startDate:String, endDate:String):Array
  
  回傳一個陣列，裡面是從startDate到endDate之間的日期字串(格式為yyyy-MM-dd)


# Installing
```
$ npm i ml.valuetool --save
```

# dependencies
* luxon ^1.10.0
* validator ^10.11.0
* express-useragent ^1.0.12
* mongo-sanitize ^1.0.1

# Build
```
$ npm run build
```

# Test
測試
```
$ npm run test
```
覆蓋率
```
$ npm run coverage
```

# Example
## vcheck
```
const { vcheck } = require('ml.valuetool');
// 或 import { vcheck } from 'ml.valuetool';

// 取得字串(trim之後)，若是undefined會回傳空字串
const str = vcheck.str(' this is a string'); 
```
## vutils
```
const { vutils } = require('ml.valuetool');
// 或 import { vutils } from 'ml.valuetool';

// 回傳依照時間產生長度為20的ID值(timestamp編碼+隨機字串)
const str = vutils.newID(20); 
```
