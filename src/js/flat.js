/**
 * provides flat class definition
 * 
 * author:     D. Bird
 * copyright:  Copyright (c) 2012-2017 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.
 * 
 * @module flat
 */
var flat;
(function() {
   if ( typeof(flat)!=='undefined' ) {
      throw new Error("flat-js: 'flat' module already loaded");
   }

   flat = (function() {
      
      /**
       * base url to flat framework for /flat/api.php
       * @attribute base_url
       * @type String
       * @readOnly
       */
      var base_url = "/flat";
      var default_router = 'flat.php';
      var pub = {};
      var priv = {};
      var toType = function(obj) {
         return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      };
      
      /**
       * wheather to display debug messages in the console
       * @attribute debug
       * @type Boolean
       * @readOnly
       */
      var debug = true;
      
      pub.baseUrl = base_url;
      pub.base_url = pub.baseUrl;
      var data_storage_prefix = 'flat/';
      
      var data_storage;
      if (localStorage!=='undefined') {
         try {
            data_storage = localStorage;
            data_storage.setItem('testKey-flatjs', '1');
            data_storage.removeItem('testKey-flatjs');

         }  catch (error) 
         {
            data_storage = null;
         }
      }
      if (!data_storage) {
         data_storage = (function() {
            var shim_prefix = 'sessionStorageShim/';
            var setCookie = function(ckey, cvalue) {
               var cname = shim_prefix + ckey;
               var d = new Date();
               d.setTime(d.getTime() + (365*24*60*60*1000));
               var expires = "expires="+d.toUTCString();
               document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
           }
           
           var getCookie = function(ckey) {
              var cname = shim_prefix + ckey;
               var name = cname + "=";
               var ca = document.cookie.split(';');
               for(var i = 0; i < ca.length; i++) {
                   var c = ca[i];
                   while (c.charAt(0) == ' ') {
                       c = c.substring(1);
                   }
                   if (c.indexOf(name) == 0) {
                       return c.substring(name.length, c.length);
                   }
               }
               return "";
           }
           var shim = {};
           //val = data_storage.getItem(fullkey);
           //data_storage.setItem(fullkey,JSON.stringify(val));
           shim.getItem = function(skey) {
              if (!pub.isString(skey)) {
                 throw new error('storage key: must be string');
              }           
              return getCookie(skey);
           };
           shim.setItem = function(skey,sval) {
              if (!pub.isString(skey)) {
                 throw new error('storage key: must be string');
              }
              if (!pub.isString(sval)) {
                 throw new error('storage value: must be string');
              }           
              return setCookie(skey,sval);
           };
           return shim;
            //document.cookie = 'cookie=ok;expires='+now.toGMTString()+';path=/';
         })();
      }
      
      
      /**
       * wheather to display stack trace in debug messages
       * @attribute debug
       * @type Boolean
       * @readOnly
       */  
      var show_debug_trace=false;
      var isTouchDevice=null;
      var click = {
         touch : "touchend",
         mouse : "click",
      };
      pub.set_click = function(touch,mouse) {
         click.touch = touch;
         click.mouse = mouse;
      };
      pub.set_click = pub.setClick;
      pub.setTouchOn = function(click_event) {
         if (typeof(click_event)!="undefined") {
            click.touch = click_event;
         }
         isTouchDevice = true;
      };
      pub.setTouchOff = function() {
         isTouchDevice = false;
      };
      pub.isTouch = function() {
         
         if (isTouchDevice===null) {
         
            isTouchDevice = 'ontouchstart' in document.documentElement;
            
         }
         return isTouchDevice;
      };
      pub.is_touch = pub.isTouch;
      pub.ucwords = function(str) {
         //  discuss at: http://phpjs.org/functions/ucwords/
         // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
         // improved by: Waldo Malqui Silva
         // improved by: Robin
         // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
         // bugfixed by: Onno Marsman
         //    input by: James (http://www.james-bell.co.uk/)
         //   example 1: ucwords('kevin van  zonneveld');
         //   returns 1: 'Kevin Van  Zonneveld'
         //   example 2: ucwords('HELLO WORLD');
         //   returns 2: 'HELLO WORLD'
   
         return (str + '')
           .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
             return $1.toUpperCase();
           });
       };
      pub.click_event = function() {
         if (pub.is_touch()) return click.touch;
         return click.mouse;
      };
      
      pub.q = function(selector) {
         return document.querySelector(selector);
      };
      
      pub.getUrl = function(request,router_arg) {
         var router = router_arg;
         if(typeof router === 'undefined'){
            router = default_router;
         } else {
            if (!router) router = '';
         }
         
         if (request) {
            return pub.base_url + '/' + router + '/' + request;
         } 
         var url = pub.base_url + '/' + router + '/';
         console.log('url...');
         console.debug(url);
         if (document && document.URL) {
            url= document.URL;
         } 
         if (!url) throw "could not get url";
         return url;
      };
      pub.get_url = pub.getUrl;
      
         
      
      /**
       * determine if debug is active or not
       * @method flat.get_debug_on()
       * @return {Boolean} true if debug is active, false otherwise
       */
      pub.getDebugOn = function() {
         if (debug) return true;
         return false;
      };
      pub.get_debug_on = pub.getDebugOn;
      /**
       * determines if given argument value is an Object
       * @method flat.is_object()
       * @return {Boolean} true if arg is object, false otherwise
       * @param {Any} val
       */
      pub.isObject = function(val) {
         if (val !== null && typeof val === 'object') {
            return true;
         }
         return false;
      };
      pub.is_object = pub.isObject;
      
      /**
       * determines if given argument value is an integer
       * @method flat.is_int()
       * @return {Boolean} true if arg is integer, false otherwise
       * @param {Any} val
       */   
      pub.isFunc = function(val) {
         if (typeof val === 'function') {
            return true;
         }
         return false;
         
      };
      pub.is_func = pub.isFunc;
      /**
       * alias of is_func()
       */
      pub.is_function = pub.isFunc;
      pub.isFunction = pub.isFunc;
      
      pub.isInt = function(val) {
         if ( (!val) && val!==0 ) return false;
         if ((undefined === val) || (null === val)) return false;
         return val % 1 == 0;
      };
      pub.is_int = pub.isInt;
      pub.isInteger = pub.isInt;
      /**
       * determines if given argument value is a String
       * @method flat.isString()
       * @return {Boolean} true if arg is string, false otherwise
       * @param {Any} val
       */      
      pub.isString = function(val) {
         if (typeof val == 'string' || val instanceof String) {
            return true;
         }
         return false;
      };
      pub.is_string = pub.isString;
      /**
       * determines if given argument value is an Array
       * @method flat.is_array()
       * @return {Boolean} true if arg is string, false otherwise
       * @param {Any} val
       */      
      pub.isArray = function(val) {
         if (pub.is_object(val)) {
            if (val.constructor === Array) {
               return true;
            }
         }
         return false;
      };
      pub.is_array = pub.isArray;
      pub.data = function (key,val_arg) {
         var val = val_arg, json;
         if (!key) throw "must provide key";
         if (!pub.isString(key)) throw "key must be string";
         var fullkey = data_storage_prefix+key;
         if(typeof val === 'undefined'){
            val = data_storage.getItem(fullkey);
            if (val === null) return null;
            try {
               if (json = JSON.parse(val)) {
                  return json;
               }
            } catch (error) {
               console.log('json error...');
               console.debug(val);
               return null;
            }
            if (json===false) return false;
            if (json === null) return null;
            throw "invalid json for key '"+key+"'";
         }
         return data_storage.setItem(fullkey,JSON.stringify(val));
      };
      /**
       * print a debug message in console
       * @method debug
       * @param {Any} data to display debug info message regarding. 
       *    if string, this is all that is displayed.
       * @param {String} label for debug message. ignored if data arg is string.
       * @return {Void}
       */
      pub.debug = function(data,label_arg) {
         var label = label_arg;
         if (!debug) return;
         if (!pub.isString(label)) label = '';
         if ( console && console.debug && console.log) {
            if (toType(data)=='string') {
               if (label) label = 'debug ('+label+')';
               if (!label) label='debug';
               console.log(label+": '"+data+"'");
               return;
            }
            if (!label) label = 'dump';
            console.log('---(start '+toType(data)+') '+label+':');
            console.debug(data);
            console.log('---caller:');
            if (show_debug_trace)
               console.debug(printStackTrace());
            console.log('---(end '+toType(data)+')---');
         } else {
            //fallback for no console functions?
         }
      };      
      
      var params=null;
      var plist = [];
      priv.parseQueryString = function(  ) {
         if (params) return;
         params = {};
         var queryString=null,url = window.location.href.split("?"),qs;
         if (url && url[1]) {
            qs = url[1].split("#");
            if (qs[0]) queryString = qs[0];
         }
         if (!queryString) return false;
         var queries, kv, i, l;
    
         // Split into key/value pairs
         queries = queryString.split("&");
    
         // Convert the array of strings into an object
         for (i = 0, l = queries.length; i < l; i++ ) {
            kv = queries[i].split('=');
            params[kv[0]] = decodeURIComponent(kv[1]);
         }
         for (var p in params) {
            plist.push(p);
         }
      };
      pub.urlQueryString = function() {
         priv.parseQueryString();
         q=[];
         for (var p in params) {
            q.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
         }
         return q.join("&");
      };   
      pub.urlQueryExists = function(key) {
         priv.parseQueryString();
         return (plist.indexOf(key)!=-1)
      };
      pub.urlQuery_keyexists = pub.urlQueryExists;
      pub.urlQueryTruthy = function(key) {
         if (
               pub.urlQuery_keyexists(key) 
               && (typeof(params[key]) !== "undefined")
               && (params[key] != 'false')
               && (params[key] != 'no')
               && (params[key] != 'off')
               && (params[key] != '0')
         ) {
            return true;
         }
         //console.debug(plist);
         return false;
      }
      pub.urlQuery_keytruthy = pub.urlQueryTruthy;
      pub.urlQueryVal = function( key ) {
         priv.parseQueryString();
         if (params[key]) return params[key];
      };
      pub.urlQuery_val = pub.urlQueryVal;
      pub.urlQuerySet = function(key,val) {
         priv.parseQueryString();
         if (typeof(val)!="undefined" && val!==null) {
            params[key] = val;
            if (plist.indexOf(key)==-1) {
               plist.push(key);
            }
         } else {
            var kidx=plist.indexOf(key);
            if (kidx!=-1) {
               delete params[key];
               plist.splice(kidx,1);
            }
         }
         var url = window.location.pathname;
         if (plist.length>0) {
            url = url + "?" + pub.urlQueryString();
         }
         window.history.pushState(null, null, url);
      };
      pub.urlQuery_set = pub.urlQuerySet;
      pub.rand = function(min_arg,max_arg) {
         var min = min_arg;
         var max = max_arg;
         if (typeof(min)=="undefined" || min<0) {
            min = 0;
         }
         if (typeof(max)=="undefined" || max > 999999) {
            max = 999999;
         }
         var rand = Math.random().toString().replace(".","").substr(0,6);
         rand = parseInt(rand);
         return ((rand * max) + min);
      };
      var makeCRCTable = function(){
         var c;
         var crcTable = [];
         for(var n =0; n < 256; n++){
             c = n;
             for(var k =0; k < 8; k++){
                 c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
             }
             crcTable[n] = c;
         }
         return crcTable;
     }
      var crcTable=null;
     var crc32 = function(str) {
        if (!crcTable) crcTable=makeCRCTable();
         var crc = 0 ^ (-1);
   
         for (var i = 0; i < str.length; i++ ) {
             crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
         }
   
         return (crc ^ (-1)) >>> 0;
     };
      pub.crc32 = function(str) {
         return crc32(str);
      };
      
      var lut = []; for (var il=0; il<256; il++) { lut[il] = (il<16?'0':'')+(il).toString(16); }
      /**
       * Fast UUID generator, RFC4122 version 4 compliant.
       * @link http://jcward.com/UUID.js
       **/
      pub.uuid = function() {
         var d0 = Math.random()*0xffffffff|0;
         var d1 = Math.random()*0xffffffff|0;
         var d2 = Math.random()*0xffffffff|0;
         var d3 = Math.random()*0xffffffff|0;
         return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
           lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
           lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
           lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
       };
       
       var moduleMap = {};
       
       var moduleList = [];
       
       var moduleReady = [];
       
       var readyQueue = {};
       
       var readyCallback = {};
       
       priv.procReadyQueue = false; 
       priv.procReadyQueueUuuid = null;
       priv.cleanReadyGarbage = false;
       priv.cleanReadyGarbageUuid = null;
       var cleanReadyGarbage = function() {
          if (priv.cleanReadyGarbage!==false) return;
          if (priv.cleanReadyGarbageUuuid!==null) return;
          priv.cleanReadyGarbage = true;
          var cleanUuid = pub.uuid();
          priv.cleanReadyGarbageUuuid = cleanUuid;
          var garbageCycle = function() {
             setTimeout(function() {
                if (priv.procReadyQueueUuuid!=procUuuid) {
                   return;
                }
                if (pub.rand(1,10)==1) {
                   var item;
                   for(var itemUuid in readyCallback) {
                      item = readyCallback[itemUuid];
                      if (flat.isObject(item) && (item.runtime!==null)) {
                         delete readyCallback[itemUuid];
                      }
                   }
                }
                garbageCycle();
             },1000);
          };
          garbageCycle();
       };
       var procReadyQueue = function() {
          if (priv.procReadyQueue!==false) return;
          if (priv.procReadyQueueUuuid!==null) return;
          priv.procReadyQueue = true;
          var procUuuid = pub.uuid();
          priv.procReadyQueueUuuid = procUuuid;
          
          var cycle = function() {
             setTimeout(function() {
                
                if (priv.procReadyQueueUuuid!=procUuuid) return;
                
                var queue = readyQueue;
                
                if (queue.length) {
                   for (var moduleName in readyQueue) {
                      
                      if (typeof(flat[moduleName]) === 'undefined') {
                         continue;
                      }
                      
                      if (moduleReady.indexOf(moduleName)==-1) {
                         continue;
                      }
                      
                      if (!flat.isArray(readyQueue[moduleName])) {
                         continue;
                      }
                      
                      var itemUuid = readyQueue[moduleName].shift();
                      
                      if (!itemUuid || !flat.isString(itemUuid)) {
                         continue;
                      }
                      
                      if (typeof(readyCallback[itemUuid])==='undefined') {
                         continue;
                      }
                      
                      var readyItem = readyCallback[itemUuid];
                      
                      if (!flat.isObject(readyItem)) {
                         throw new Error("flat-js: invalid readyItem in readyCallback["+moduleName+"] item["+itemUuid+"]");
                      }
                      
                      if (readyItem.status) {
                         continue;
                      }
                      
                      readyCallback[itemUuid].status = true;
                      
                      if (!flat.isString(readyItem.moduleName)) {
                         var msg = "flat-js: invalid moduleName readyItem["+moduleName+"] item["+itemUuid+"]"
                         readyItem.status = new Error(msg);
                         console.warn(msg);
                         continue;
                      }
                      
                      if (readyItem.moduleName!=moduleName) {
                         var msg = "flat-js: moduleName mismatch in readyItem["+moduleName+"] item["+itemUuid+"]"
                         readyItem.status = new Error(msg);
                         console.warn(msg);
                         continue;
                      }
                      
                      if (!flat.isFunc(readyItem.callback)) {
                         var msg = "flat-js: invalid callback in readyItem["+moduleName+"] item["+itemUuid+"]"
                         readyItem.status = new Error(msg);
                         console.warn(msg);
                         continue;
                      }
                      
                      //var module = moduleMap[moduleName];
                      
                      readyItem.callback.call(moduleMap[moduleName]);
                      
                      readyCallback[itemUuid].runtime = + new Date();
                      
                   }
                }
                
                cycle();
                
             },150);
          }
          
          cycle();
          cleanReadyGarbage();
       };
       
       pub.ready = function(moduleName,callback) {
          
          if (!moduleName || !flat.isString(moduleName)) {
             throw new Error("flat-js: invalid moduleName");
          }
          
          if (!pub.isFunc(callback)) {
             throw new Error("flat-js: invalid callback");
          }
          
          if (!flat.isArray(readyQueue[moduleName])) {
             readyQueue[moduleName] = [];
          }
          
          setTimeout(function() {
             var itemUuid = pub.uuid();
             
             readyCallback[itemUuid] = {
                moduleName : moduleName,
                created : + new Date(),
                callback : callback,
                status : false,
                runtime : null,
             };
             
             if (moduleList.indexOf(moduleName)==-1) {
                readyQueue[moduleName].push(itemUuid);
                return;
             }
             
             if (moduleList.indexOf(moduleName)==-1) {
                readyQueue[moduleName].push(itemUuid);
                return;
             }
             
          },1);
          
          
       };
       
       
       pub.load = function(moduleName,module) {
          if (!moduleName || !flat.isString(moduleName)) {
             throw new Error("flat-js: invalid moduleName");
          }
          if (moduleList.indexOf(moduleName)!=-1) {
             //throw new Error("flat-js: "+moduleName+"module already loaded");
             return;
          }
          
          if (!flat.isObject(module) && !flat.isFunction(module)) {
             throw new Error("flat-js: invalid module");
          }
          
          moduleList.push(moduleName);
          
          moduleMap[moduleName] = module;
          
          if (typeof(flat[moduleName])==='undefined') {
             flat[moduleName] = moduleMap[moduleName];
          }
          
          moduleReady.push(moduleName);
          
       };
       
      return pub;
   }());





})();








