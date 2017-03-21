# Flat-js
**The Flat JavaScript Companion**

*Flat-js* is the JavaScript companion to "[The Flat Framework](https://github.com/katmore/flat)". It contains convenience wrappers and utility functions.

## Installation
*Flat-js* may be installed using Bower or a CDN as described below.

### Install using Bower
#### Bower Step 1: execute bower shell command:
```Shell
$ bower install katmore/*Flat-js* --save
```
#### Bower Step 2: include script tag pointing your project's bower components path
```html
<!-- change './bower_components' to point to your project's bower components path as appropriate-->
<script src="./bower_components/flat-js/dist/js/flat.min.js"></script>
```

### Install using CDN
**Include script tag from rawgit CDN:**
```html
<!-- thanks to Ryan Grove for operating https://rawgit.com-->
<script src="https://cdn.rawgit.com/katmore/flat-js/master/dist/js/flat.min.js"></script>
```
(See the [rawgit CDN FAQ](https://github.com/rgrove/rawgit/wiki/Frequently-Asked-Questions) for more information)

## Examples
 * [URL query examples](#url-query-examples)
 * [Value testing examples](#value-testing-examples)

### URL query examples
*Flat-js* simplifies reading and manipulating browser URLs to single lines.

In the examples below, replace "example.com" with the host and path to your project/resource, 
then add the query string to the URL in your browser.

#### Example 1.1: Does a query key exist?
```javascript
//
// assuming browser URL: http://example.com/?ohai&my_key=my_value
//
var ohai_exists = flat.urlQueryExists('ohai');
var obai_exists = flat.urlQueryExists('obai');
var mykey_exists = flat.urlQueryExists('obai');
console.log('Does "ohai" exist? '+ohai_exists);
console.log('Does "obai" exist? '+obai_exists);
console.log('Does "my_key" exist? ' + mykey_exists);
```
#### Example 1.2: Determine a query key/val value.
```javascript
//
// assuming browser URL: http://example.com/?my_key=my_value
//
var myKeyValue = flat.urlQueryGet('my_key');
console.log('my_key value: '+ myKeyValue);
```
#### Example 1.3: Determine if a query key/val has a "truthy" value.
```javascript
//
// assuming browser URL: 
//   http://example.com/?my_option1=on,my_option2=off,my_option3=yes,my_option4=no,my_option5=true,my_option6=false
//
var myOption1 = flat.urlQueryTruthy('my_option1');
var myOption2 = flat.urlQueryTruthy('my_option2');
var myOption3 = flat.urlQueryTruthy('my_option3');
var myOption4 = flat.urlQueryTruthy('my_option4');
var myOption5 = flat.urlQueryTruthy('my_option5');
var myOption6 = flat.urlQueryTruthy('my_option6');
console.log('myOption1? '+myOption1 + '(string value was "on")');
console.log('myOption2? '+myOption2 + '(string value was "off")');
console.log('myOption3? '+myOption3 + '(string value was "yes")');
console.log('myOption4? '+myOption4 + '(string value was "no")');
console.log('myOption5? '+myOption5 + '(string value was "true")');
console.log('myOption6? '+myOption6 + '(string value was "false")');
```
#### Example 1.4: Changing a query key/val value.
```javascript
//
// assuming browser URL: http://example.com/?my_key=my_value
//
flat.urlQuerySet('my_key','my_new_value');
//
// look at your browser URL now, 
//    it will read: http://example.com/?my_key=my_new_value
//
console.log('my_key value from urlQuerySet: '+ myKeyValue);
```

### Value testing examples
*Flat-js* simplifies value testing to single lines.

#### Example 2.1: test if value is function
```javascript
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1Function flat.isFunc(var1);
var isVar2Function flat.isFunc(var2);
var isVar3Function flat.isFunc(var3);
var isVar4Function flat.isFunc(var4);
var isVar5Function flat.isFunc(var5);
console.log('is var1 a function? '+isVar1Function);
console.log('is var2 a function? '+isVar2Function);
console.log('is var3 a function? '+isVar3Function);
console.log('is var4 a function? '+isVar4Function);
console.log('is var5 a function? '+isVar5Function);
```
#### Example 2.2: test if value is integer
```javascript
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1Integer flat.isInt(var1);
var isVar2Integer flat.isInt(var2);
var isVar3Integer flat.isInt(var3);
var isVar4Integer flat.isInt(var4);
var isVar5Integer flat.isInt(var5);
console.log('is var1 a integer? '+isVar1Integer);
console.log('is var2 a integer? '+isVar2Integer);
console.log('is var3 a integer? '+isVar3Integer);
console.log('is var4 a integer? '+isVar4Integer);
console.log('is var5 a integer? '+isVar5Integer);
```
#### Example 2.3: test if value is string
```javascript
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1String flat.isString(var1);
var isVar2String flat.isString(var2);
var isVar3String flat.isString(var3);
var isVar4String flat.isString(var4);
var isVar5String flat.isString(var5);
console.log('is var1 a string? '+isVar1String);
console.log('is var2 a string? '+isVar2String);
console.log('is var3 a string? '+isVar3String);
console.log('is var4 a string? '+isVar4String);
console.log('is var5 a string? '+isVar5String);
```
#### Example 2.4: array and object value test
flat.isArray() and flat.isObject() work similarly to flat.isFunc(), flat.isInt, and flat.isString()...
```javascript
// flat.isArray()
console.log('am I an array?' + flat.isArray([]);
console.log('am I an array?' + flat.isArray("poop");
// flat.isObject()
console.log('am I an object?' + flat.isObject({});
console.log('am I an object?' + flat.isObject("poop");
```

## Legal
### Copyright
The Flat JavaScript Companion - https://github.com/katmore/flat-js

Copyright (c) 2012-2017 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.

### License
"The Flat JavaScript Companion" is copyrighted free software.

You may redistribute and modify it under either the terms and conditions of the
"The MIT License (MIT)"; or the terms and conditions of the "GPL v3 License".
See [LICENSE](https://github.com/katmore/flat-js/blob/master/LICENSE) and [GPLv3](https://github.com/katmore/flat-js/blob/master/GPLv3).
