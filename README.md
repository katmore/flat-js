# flat-js
Javascript companion to [the flat framework](https://github.com/katmore/flat). Offers convenient single-line wrappers for a variety of functionality.

##Installation
Install using one of either the Bower or CDN methods as detailed below.

### Installation Method 1: Using Bower
#### Step 1: execute bower shell command:
```Shell
$ bower install katmore/flat-js --save
```
#### Step 2: include script tag pointing your project's bower components path
```html
<!-- change './bower_components' to point to your project's bower components path as needed-->
<script src="./bower_components/flat-js/src/flat.js"></script>
```

### Installation Method 2: Using CDN
include script tag from rawgit CDN
```html
<!-- thanks to Ryan Grove for operating https://rawgit.com-->
<script src="https://cdn.rawgit.com/katmore/flat-js/master/src/js/flat.js"></script>
```
(See the [rawgit CDN FAQ](https://github.com/rgrove/rawgit/wiki/Frequently-Asked-Questions) for more information)

## Documentation
Unfortunately, flat-js documentation has not yet been generated; though some functions have JSDoc comment blocks.

## Examples
 * [URL Queries](#url-query-examples)
 * [Value testing](#value-testing-examples)

### URL query Examples
Flat-js simplifies reading and manipulating browser URLs to single lines.

In the examples below, replace "example.com" with the host and path to your project/resource, 
then add the query string to the URL in your browser.

#### Example 1.1: Does a query key exist?
```javascript
//
// assuming browser URL: http://example.com/?ohai&my_key=my_value
//
var ohai_exists = flat.urlQuery_keyexists('ohai');
var obai_exists = flat.urlQuery_keyexists('obai');
var mykey_exists = flat.urlQuery_keyexists('obai');
console.log('Does "ohai" exist? '+ohai_exists);
console.log('Does "obai" exist? '+obai_exists);
console.log('Does "my_key" exist? ' + mykey_exists);
```
#### Example 1.2: Determine a query key/val value.
```javascript
//
// assuming browser URL: http://example.com/?my_key=my_value
//
var myKeyValue = flat.urlQuery_get('my_key');
console.log('my_key value: '+ myKeyValue);
```
#### Example 1.3: Determine if a query key/val has a "truthy" value.
```javascript
//
// assuming browser URL: 
//   http://example.com/?my_option1=on,my_option2=off,my_option3=yes,my_option4=no,my_option5=true,my_option6=false
//
var myOption1 = flat.urlQuery_keytruthy('my_option1');
var myOption2 = flat.urlQuery_keytruthy('my_option2');
var myOption3 = flat.urlQuery_keytruthy('my_option3');
var myOption4 = flat.urlQuery_keytruthy('my_option4');
var myOption5 = flat.urlQuery_keytruthy('my_option5');
var myOption6 = flat.urlQuery_keytruthy('my_option6');
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
flat.urlQuery_set('my_key','my_new_value');
//
// look at your browser URL now, 
//    it will read: http://example.com/?my_key=my_new_value
//
console.log('my_key value from urlQuery_set: '+ myKeyValue);
```

### Value testing examples
Flat-js simplifies value testing to single lines.

#### Example 2.1: test if value is function
```javascript
var var1 = function() {};
var var2 = {};
var var3 = "";
var var4 = 1;
var var5 = [];
var isVar1Function flat.is_func(var1);
var isVar2Function flat.is_func(var2);
var isVar3Function flat.is_func(var3);
var isVar4Function flat.is_func(var4);
var isVar5Function flat.is_func(var5);
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
var isVar1Integer flat.is_int(var1);
var isVar2Integer flat.is_int(var2);
var isVar3Integer flat.is_int(var3);
var isVar4Integer flat.is_int(var4);
var isVar5Integer flat.is_int(var5);
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
var isVar1String flat.is_string(var1);
var isVar2String flat.is_string(var2);
var isVar3String flat.is_string(var3);
var isVar4String flat.is_string(var4);
var isVar5String flat.is_string(var5);
console.log('is var1 a string? '+isVar1String);
console.log('is var2 a string? '+isVar2String);
console.log('is var3 a string? '+isVar3String);
console.log('is var4 a string? '+isVar4String);
console.log('is var5 a string? '+isVar5String);
```
#### Example 2.4: array and object value test
flat.is_array() and flat.is_object work similarly to is_func, is_int, and is_string...
```javascript
// flat.is_array()
console.log('am I an array?' + flat.is_array([]);
console.log('am I an array?' + flat.is_array("poop");
// flat.is_object()
console.log('am I an object?' + flat.is_array({});
console.log('am I an object?' + flat.is_array("poop");
```
