[![Build Status](https://travis-ci.org/ML-Jason/ml.vartool.svg?branch=master)](https://travis-ci.org/ML-Jason/ml.vartool)
[![Test Coverage](https://api.codeclimate.com/v1/badges/951ba2030fc02992c0e1/test_coverage)](https://codeclimate.com/github/ML-Jason/ml.vartool/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!--[![Coverage Status](https://coveralls.io/repos/github/ML-Jason/ml.vartool/badge.svg?branch=master)](https://coveralls.io/github/ML-Jason/ml.vartool?branch=master)-->

# Table of content
<!-- TOC -->

- [Table of content](#table-of-content)
- [ml.vartool](#mlvartool)
  - [vcheck](#vcheck)
  - [vutils](#vutils)
  - [twzip](#twzip)
- [Installing](#installing)
- [dependencies](#dependencies)
- [Build](#build)
- [Test](#test)
- [Usage](#usage)
  - [vcheck](#vcheck-1)
  - [vutils](#vutils-1)
  - [twzip](#twzip-1)

<!-- /TOC -->

# ml.vartool
ml.vartool是用來處理變數的一個函式庫，包含了vcheck、vutils、twzip。   
vcheck用來驗證變數型別。  
vutils用來產生變數。  
twzip是台灣的縣市區域郵遞區號。


## vcheck
建構於[validator.js](https://github.com/chriso/validator.js)之上。
針對參數的驗證，擴充(或簡化)了一些function。
> 原本validator.js的功能完整的被vcheck繼承，因此仍然可以透過vcheck使用。

method | return | description
---    | ---    | ---   
str(val) | String | 將傳入參數轉成String，並去掉前後空白(trim)
alphanumeric(val) | String | 確認是否為英數組成的字串，若不是，則回傳空字串
normalStr(val) | String | 只允許英數、以及_@.-
number(val) | Number | 將傳入值轉成數字，失敗則回傳NaN
email(val) | String | 確認是否為email，失敗則回傳空字串
mongoID(val) | String | 確認是否為mongoID格式，失敗則回傳空字串
url(val, {noLocalhost=true}) | String | 確認是否為url格式，失敗則回傳空字串。可允許*符號，但只限於使用在第一層sub-domain。<br/>noLocalhost參數可以控制是否允許localhost(預設為不允許)
boolean(val) | Boolean | 除了1或'1'或true，其餘都返回false
luxon(val, fmt) | DateTime | 將物件或字串轉成luxon的DateTime格式，可傳入JS Date或是字串(yyyy-MM-dd)，如果傳入的字串不是預設的yyyy-MM-dd，則可以藉由第二個參數fmt來自訂格式。<br/>luxon DateTime的使用方式請參考：[luxon](https://github.com/moment/luxon)。
json(val) | Object | 將物件或字串藉由json轉換成新物件，如果失敗，則回傳null
array(val) | Array | 將物件或字串藉由json轉換成新Array，如果失敗，則回傳null
escapeRegex(val) | String | 將字串裡的特定字元escape以供正常的regexp使用
escape(val) | String | replace <, >, &, ', " and / with HTML entities

## vutils
提供一些常用的變數轉換(產生)功能。

method | return | description
---    | ---    | ---         
randomStr(length:Number=10, addChars:String) | String | 產生亂數字串(預設為英數，區分大小寫)。<br/>length為字串長度，預設為10。<br/>addChars為除了英數以外要加入的字元，以字串的形式串起來。
newID(length:Number=15) | String | 依據timestamp產生字串。<br/>length為字串長度，預設是15。<br/>字串開頭為timestamp轉成16進位字串，未滿length的長度則由randomStr補足。
md5(val:String) | String | 把字串md5編碼
replaceAll(str:String, search:String, replace:String) | String | 將str裡符合search的所有字串取代成replace。
hashName(str:String, replace:String='○') | String | 把str中間(1/3長度)的字元取代成replace。
hashEmail(str:String, replace:String='○') | String | 類似hashName()，把email進行hash。
clientIP(req:Object) | String | 傳入express的req物件，解析user的IP。
useragent(req:Object) | Object | 傳入express的req物件，解析user的useragent。<br/>回傳物件為[express-useragent](https://github.com/biggora/express-useragent)物件。<br/>  vutils額外擴充了解析IP的功能(express-useragent並沒有解析IP)，存放在ip這個屬性裡。
datesBetween(startDate:String, endDate:String) | Array | 回傳一個陣列，裡面是從startDate到endDate之間的日期字串(格式為yyyy-MM-dd)

## twzip
台灣的縣市區域郵遞區號列表，是一個陣列。  
資料格式如下：

```js
[
  {
    name: '縣市名稱',
    en: '縣市英文名',
    dist: [
      {
        name: '區域名稱',
        en: '區域英文名',
        c3: '三碼郵遞區號',
      },
    ],
  },
]
```

# Installing
```
$ npm i ml.vartool --save
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

# Usage
## vcheck
```js
const { vcheck } = require('ml.vartool');
// 或 import { vcheck } from 'ml.vartool';

// 取得字串(trim之後)，若是undefined會回傳空字串
const str = vcheck.str(' this is a string'); 

// 使用從validator繼承而來的method
const islowercase = vcheck.isLowercase('abc');
```
## vutils
```js
const { vutils } = require('ml.vartool');
// 或 import { vutils } from 'ml.vartool';

// 回傳依照時間產生長度為20的ID值(timestamp編碼+隨機字串)
const str = vutils.newID(20); 
```

## twzip
```js
const { twzip } = require('ml.vartool');
// 或 import { twzip } from 'ml.vartool';

console.log(twzip);
```