/**
 * Log output module
 * 
 * author:     D. Bird
 * copyright:  Copyright (c) 2012-2017 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.
 * 
 * @module flat/logEntry
 */
(function() {

   if ( (flat === null || typeof flat !== 'object') ||  typeof(flat.load) != 'function') {
      throw new Error("flat/logEntry: missing flat.js");
   }
   
   var pushLogEntry,logError,logInfo,logWarning,logConfig;

   (function() {
      //console.log('flat/logEntry module');
      var config = {
         enableShowInUI : true,
         alwaysShowInUI : true,
         enableConsole : true,
         nsPrefix : {
            'error' : 'error',
            'info' : 'info',
            'warn' : 'warn',
         },
         nsPrefixFallback : 'info',
         typeFallback : 'info',
         nsSeparator : '.',  
      };
      
      if (typeof(logConfig)=='undefined') {
         logConfig = config;
      }
   
      var logEx = function(ns,msg,data) {
         
         if (flat.is_string(ns)=='string') {
            this.name = ns;
         } else {
            this.name = config.nsPrefixFallback;
         }
         
         this.message = msg;
      };
      logEx.prototype = new Error; 
      var logErrorEx = function(ns,msg,data) {
         
         if (flat.is_string(ns)=='string') {
            this.name = ns;
         } else {
            this.name = 'logEntryError';
         }
         
         this.message = msg;
         this.stack = (new Error()).stack;
      };
      logErrorEx.prototype = new Error;    
      var pushLogFallback = function(type,msg,data,ns) {
         if (flat.is_string(type) && type=='error') {
            throw new logErrorEx(ns,msg,data);
            return;
         }
         throw new logEx(ns,msg,data);
      };
      
      var logMeta = {
         init : false,
         hasConsole : null,
         console : {
            error : null,
            debug : null,
            info : null,
            warn : null,
         },
      };
      
      
      var logListener = function(ns,callback) {
         this.ns = ns;
         this.callback = callback;
      };
      
      var logListenerNS = {};
      
      var addLogListener = function (ns,callback) {
         if (flat.is_string(ns) && flat.is_function(callback)) {
            var l = new logListener(ns,callback);
            if (!logListenerNS[ns]) {
               logListenerNS[ns]=[l];
            } else {
               logListenerNS[ns].push(l);
            }
         }
      };
      var logInitMutex = false;
      var logInit = function(callback) {
   
         if (logMeta.init) {
            return setTimeout(function() {
               logInit(callback);
            },1);
         }
         if (logInitMutex) {
            return setTimeout(function() {
               if (logInitMutex) logInit(callback);
               return;
            },100);
         }
         logInitMutex = true;      
         if (!flat.is_object(console)) {
            logMeta.hasConsole = false;
         } else {
            logMeta.hasConsole = true;
            for (var c in logMeta.console) {
               logMeta.console[c] = false;
            }         
            if (flat.is_function(console.debug)) {
               logMeta.console.debug = true;
            } 
            if (flat.is_function(console.error)) {
               logMeta.console.error = true;
            }      
            if (flat.is_function(console.info)) {
               logMeta.console.info = true;
            } 
            if (flat.is_function(console.warn)) {
               logMeta.console.warn = true;
            }      
            if (flat.is_function(console.log)) {
               logMeta.console.log = true;
            }   
         }
         logMeta.init = true;
         
         if (flat.is_func(callback)) {
            callback();
         }
         
         logInit = function(callback) {
            if (flat.is_func(callback)) {
               callback();
            }
         };
         
      };
      
      
      if (typeof(pushLogEntry)!='undefined') return;  
      
      pushLogEntry = function(type,msg,data,ns) {
         //console.log('pushLogEntry...');
         logInit(function() {
            var logmsg = '';
            if (flat.is_string(msg)) {
               logmsg = ': ' + msg;
            }
            var nsStr = '';
            if (flat.is_string(ns)) nsStr = ns;
            var dataHandler=function() {};
            if (logMeta.console.debug && typeof(data)!=='undefined') {
               dataHandler = function() {
                  console.debug(data);
               };
            }   
            if (flat.is_string(type)) {
               if (logMeta.console[type] && logMeta.console[type]===true) {
                  dataHandler();
                  return console[type](ns+ logmsg);
               } else if (logMeta.console.log) {
                  dataHandler();
                  return console.log('('+type+') '+nsStr + logmsg);
               } 
            }
            if (logMeta.console.log) {
               dataHandler();
               return console.log('('+config.typeFallback+') '+nsStr + logmsg);
            } 
            pushLogFallback(type,msg,data,ns);
         });
      };
      
      if (typeof(logError)=='undefined') {
    
         logError = function(ns,msg,data) {
            pushLogEntry('error',msg,data,ns);
         };
      
      }
      
      if (typeof(logInfo)=='undefined') {
      
         logInfo = function(ns,msg,data) {
            pushLogEntry('info',msg,data,ns);    
         };
      
      }
      
      if (typeof(logWarning)=='undefined') {
         
         logWarning = function(ns,msg,data) {
            
            pushLogEntry('warn',msg,data,ns);         
         };
         
      }
      
   })();
   //pushLogEntry,logError,logInfo,logWarning,logConfig
   flat.load('pushLogEntry',pushLogEntry);
   flat.load('logError',logError);
   flat.load('logInfo',logInfo);
   flat.load('logWarning',logWarning);
   flat.load('logConfig',logConfig);

})();

