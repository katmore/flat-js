# Flat-js
**The Flat JavaScript Companion**

*Flat-js* contains convenience wrappers and utility functions.

## Installation
*Flat-js* may be installed using Bower or a CDN as described below.

### Install using Bower
#### Bower Step 1: execute bower shell command:
```Shell
$ bower install flat-js --save
```
#### Bower Step 2: include script tag pointing your project's bower components path
```html
<!-- change './bower_components' to point to your project's bower components path as appropriate-->
<script src="./bower_components/flat-js/dist/js/flat.min.js"></script>
```

### Install using CDN
**Include script tag from githack CDN:**
```html
<script src="https://rawcdn.githack.com/katmore/flat-js/master/src/js/flat.js"></script>
```
(See the [githack CDN FAQ](https://raw.githack.com/#faq) for more information)

## Examples
 * [URL query examples](#url-query-examples)
 * [Value testing examples](#value-testing-examples)
 * [Heredoc examples](#heredoc-examples)

### URL query examples
*Flat-js* simplifies reading and manipulating browser URLs to a single line of code.

In the examples below, replace "example.com" with the host and path to your project/resource, 
then add the query string to the URL in your browser.

#### Determine if a url query key exists.
**source:**
```js
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
**console output:**
```txt
Does "ohai" exist? yes
Does "obai" exist? no
Does "my_key" exist? yes
```
#### Get a url query key value.
**source:**
```js
//
// assuming browser URL: http://example.com/?my_key=my_value
//
var myKeyValue = flat.urlQueryGet('my_key');
console.log('my_key value: '+ myKeyValue);
```
**console output**
```txt
my_key value: my_value
```
#### Determine if a url query key has a "truthy" value.
**source:**
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
console.log('myOption1: '+myOption1 + ' (string value was "on")');
console.log('myOption2: '+myOption2 + ' (string value was "off")');
console.log('myOption3: '+myOption3 + ' (string value was "yes")');
console.log('myOption4: '+myOption4 + ' (string value was "no")');
console.log('myOption5: '+myOption5 + ' (string value was "true")');
console.log('myOption6: '+myOption6 + ' (string value was "false")');
```
**console output:**
```txt
myOption1: true (string value was "on")
myOption2: false (string value was "off")
myOption3: true (string value was "yes")
myOption4: false (string value was "no")
myOption5: true (string value was "true")
myOption6: false (string value was "false")
```
#### Change a url query value.
**source:**
```js
//
// assuming browser URL: http://example.com/?my_key=my_value
//
flat.urlQuerySet('my_key','my_new_value');
//
// look at your browser URL now, 
//    it will read: http://example.com/?my_key=my_new_value
//
console.log('my_key value: '+ flat.urlQueryGet('my_key'));
```
**console output:**
```txt
my_key value: my_new_value
```

### Value testing examples
*Flat-js* simplifies many value tests to a single line of code.

#### Determine if value is function example
**source:**
```javascript
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1Function = flat.isFunc(var1);
var isVar2Function = flat.isFunc(var2);
var isVar3Function = flat.isFunc(var3);
var isVar4Function = flat.isFunc(var4);
var isVar5Function = flat.isFunc(var5);
console.log('is var1 a function? '+isVar1Function);
console.log('is var2 a function? '+isVar2Function);
console.log('is var3 a function? '+isVar3Function);
console.log('is var4 a function? '+isVar4Function);
console.log('is var5 a function? '+isVar5Function);
```
**console output:**
```txt
is var1 a function? true
is var2 a function? false
is var3 a function? false
is var4 a function? false
is var5 a function? false
```
#### Determine if value is integer example
**source:**
```js
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1Integer = flat.isInt(var1);
var isVar2Integer = flat.isInt(var2);
var isVar3Integer = flat.isInt(var3);
var isVar4Integer = flat.isInt(var4);
var isVar5Integer = flat.isInt(var5);
console.log('is var1 a integer? '+isVar1Integer);
console.log('is var2 a integer? '+isVar2Integer);
console.log('is var3 a integer? '+isVar3Integer);
console.log('is var4 a integer? '+isVar4Integer);
console.log('is var5 a integer? '+isVar5Integer);
```
**console output:**
```txt
is var1 a integer? false
is var2 a integer? false
is var3 a integer? false
is var4 a integer? true
is var5 a integer? false
```
#### Determine if value is string example
**source:**
```js
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1String = flat.isString(var1);
var isVar2String = flat.isString(var2);
var isVar3String = flat.isString(var3);
var isVar4String = flat.isString(var4);
var isVar5String = flat.isString(var5);
```
**console output:**
```txt
is var1 a string? false
is var2 a string? false
is var3 a string? true
is var4 a string? false
is var5 a string? false
```
#### Determine if value is array or object
flat.isArray() and flat.isObject() work similarly to flat.isFunc(), flat.isInt, and flat.isString()...
**source:**
```js
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
console.log('is var1 an array: '+flat.isArray(var1));
console.log('is var1 an object: '+flat.isObject(var1));
console.log('is var2 an array: '+flat.isArray(var2));
console.log('is var2 an object: '+flat.isObject(var2));
console.log('is var3 an array: '+flat.isArray(var3));
console.log('is var3 an object: '+flat.isObject(var3));
console.log('is var4 an array: '+flat.isArray(var4));
console.log('is var4 an object: '+flat.isObject(var4));
console.log('is var5 an array: '+flat.isArray(var5));
console.log('is var5 an object: '+flat.isObject(var5));
```
**console output:**
```txt
is var1 an array: false
is var1 an object: false
is var2 an array: false
is var2 an object: true
is var3 an array: false
is var3 an object: false
is var4 an array: false
is var4 an object: false
is var5 an array: true
is var5 an object: false
```
### Heredoc examples
The `flat.heredoc()` function facilitates a HEREDOC-like declaration of string values.

#### single-line heredoc string declaration
**source:**
```js
var myString = flat.heredoc(function() { /*this is the string value*/ });
console.log(myString);
```
**console output:**
```txt
this is the string value
```
     
#### multi-line heredoc string declaration
**source:**
```js
var myString = flat.heredoc(function() { /*
this string has
more than
one line
*/ });
console.log(myString);
```
**console output:**
```txt
this string has
more than
one line
```

## Legal
### Copyright
The Flat JavaScript Companion - https://github.com/katmore/flat-js

Copyright (c) 2012-2018 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.

### License
"The Flat JavaScript Companion" is copyrighted free software.

You may redistribute and modify it under either the terms and conditions of the
"The MIT License (MIT)"; or the terms and conditions of the "GPL v3 License".
See [LICENSE](https://github.com/katmore/flat-js/blob/master/LICENSE) and [GPLv3](https://github.com/katmore/flat-js/blob/master/GPLv3).
