# flat-js
Flat's javascript library

##Installation
It is fairly simple to install flat-js via Bower or CDN.

### Option 1: Using Bower
execute bower shell command:
```Shell
bower install katmore/flat-js --save
```
include script tag from your project's bower components path
```html
<script src="./components/flat-js/src/flat.js"></script>
```

### Option 2: Using CDN (See the [rawgit CDN FAQ](https://github.com/rgrove/rawgit/wiki/Frequently-Asked-Questions))
include script tag from rawgit CDN
```html
<!-- thanks to Ryan Grove for operating https://rawgit.com-->
<script src="https://cdn.rawgit.com/katmore/flat-js/master/src/js/flat.js"></script>
```
## Documentation
Unfortunately, flat-js documentation has not yet been generated; though most functions have JSDoc comment blocks.

## Examples
 * URL Queries
 * Value testing
### Example 1: URL query values
Flat simplifies reading and manipulating browser URLs to single lines.

In the examples below, Replace "example.com" with the host and path to your project/resource, 
then add the query string to the URL in your browser.

#### Example 1.1: Does a query key exist?
```javscript
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
### Example 1.2: Determine a query key/val value.
```javascript
//
// assuming browser URL: http://example.com/?my_key=my_value
//
var myKeyValue = flat.urlQuery_get('my_key');
console.log('my_key value: '+ myKeyValue);
```
#### Example 1.3: Determine if a query key/val has a "truthy" value.
```
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

