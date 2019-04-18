/**
 * Convenience wrapper for AJAX routines when using \flat\api PHP classes
 * 
 * author:     D. Bird
 * copyright:  Copyright (c) 2012-2017 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.
 * 
 * @module flat/api
 */
(function() {

   if ( (flat === null || typeof flat !== 'object') ||  typeof(flat.load) != 'function') {
      throw new Error("flat/api: missing flat-js");
   }
   if (!jQuery) throw new Error("flat/api: missing jQuery");

   flat.load('api', (function() {
   
      
      /**
       * jquery ajax timeout
       * @attribute ajax_timeout
       * @type Integer
       * @readOnly
       */
      var ajax_timeout=30000;
      
      /**
       * base url to flat framework for /flat/api.php
       * @attribute base_url
       * @type String
       * @readOnly
       */
      var base_url = flat.base_url;
      
      /**
       * wheather to display missing property the console 
       *    when given error during response validation
       * @attribute log_missing_response_property
       * @type Boolean
       * @readOnly
       */
      var log_missing_response_property = true;
   
      /*
       * accessible properties/methods for 
       *    'flat' (api) object
       */
      var pub = {};
   
      /**
       * base url for flat/api requests
       * @property api_base_url
       * @type String
       */
      pub.api_base_url = base_url+'/api.php';
      
      
   
      
      /**
       * get full url for given request path
       * 
       * @method flat.api.get_url()
       * @return {Boolean}
       * @param {Any} request
       */      
      pub.get_url = function(request) {
         if (flat.is_string(request))
            return pub.api_base_url+'/'+request;
      };
      /**
       * exception if could not determine a path
       * 
       * @class flat.api.cannot_get_path
       * @constructor
       * @param {String} (optional) url that could not be converted
       * @param {String} (optional) reason could not be determined
       */
      pub.cannot_get_path = function(url,reason) {
         var pub = {};
         if (reason) {
            reason = "reason: "+reason;
         } else {
            reason = '';
         }
         if (!url) var url = '';
         pub.url = url;
         pub.toString = function() { return "could not get a path from given url"+reason;};
         pub.name = "cannot_get_path";
         pub.message = pub.toString;
         return pub;
      };
      /**
       * exception if could not determine a reference
       * @class flat.api.cannot_get_ref
       * @constructor
       * @param {String} (optional) url that could not be converted
       * @param {String} (optional) reason could not be determined
       */
      pub.cannot_get_ref = function(url,reason) {
         var pub = {};
         if (reason) {
            reason = "reason: "+reason;
         } else {
            reason = '';
         }
         if (!url) var url = '';
         pub.url = url;
         pub.toString = function() { return "could not get a path from given url"+reason;};
         pub.name = "cannot_get_ref";
         pub.message = pub.toString;
         return pub;
      };   
      
      /**
       * exception if provided with invalid property list 
       * 
       * @class flat.api.props_arg_invalid
       */
      pub.props_arg_invalid = function() {
         
         var pub = {};
         pub.toString  = function() { return "props arg is not object";};
         
         pub.name = "props_arg_invalid";
         pub.message = pub.toString;
         return pub; 
      };   
   
      /**
       * exception response not object response validation
       * 
       * @class flat.api.props_arg_invalid
       */
      pub.response_not_object = function() {
         var pub = {};
   
         pub.toString = function() { return "response is not object";};
         
         pub.name = "response_not_object";
         pub.message = pub.toString;
         return pub;
      };
      
      /**
       * exception response missing property response validation 
       * @class flat.api.missing_expected_property
       * @constructor
       * @param {String} required property name
       */   
      pub.missing_expected_property = function(property) {
         if (typeof property != 'string' && !(property instanceof String)) {
            //flat.debug(property,"property arg");
            throw "property arg must be string";
         }
         var pub = {};
         /**
          * missing property name
          * 
          * @method get_property
          * @for missing_expected_property
          * @return {String}
          */
         pub.get_property = function() {
            return property;
         };
         pub.toString = function() {
            return "response missing property: "+property;
         };
         pub.name = "missing_expected_property";
         pub.message = pub.toString;         
         return pub;
      };
      
      /**
       * provide a flat/api path as appropriate
       * 
       * @method flat.api.url_to_path()
       * @param {String} (optional) url to convert. if not given, uses window url.
       * @return {String} api request path correlating to url
       * @throws cannot_get_path
       */
      pub.url_to_path = function(url) {
         var idx;
         if (!url) url=flat.get_url();
         if (!url) throw pub.cannot_get_path(url,"url arg not given and no environmental url");
         ////flat.debug(url,"url");
         if ((idx=url.lastIndexOf(search='flat.php/'))<0) {
            if ((idx=url.lastIndexOf(search='api.php/'))<0) {
               throw pub.cannot_get_path(url,"could not find flat sub path in url");
            }
         }
         idx = idx+search.length;
         ////flat.debug(idx,"idx");
         ////flat.debug(url.substr(idx),"path from idx");
         return url.substr(idx);
      };
      /**
       * provide ref (slug) as appropriate
       * 
       * @method flat.api.url_to_path()
       * @param {String} url (optional)
       * @param {String} path (optional) request path indicating everything after this point is the ref slug
       * @return {String} ref (slug)
       */
      pub.url_to_ref = function(url,path) {
         var chunk,ref;
         if (!url) url=flat.get_url();
         if (!path) {
            ////flat.debug(url.substr(-1),'last char');
            if (url.substr(-1)=="/") {
               chunk = url.split("/");
               for(i=chunk.length;i>=0;i<i--) {
                  if (chunk[i]) {
                     ref = chunk[i];
                     break;
                  }
               }
               ////flat.debug(chunk,"chunk");
            } else {
               ref= url.substr(url.lastIndexOf('/') + 1);
            }
            ////flat.debug(ref,'ref in to_ref');
            return ref;
         }
         ////flat.debug(path,"path in to_ref");
         if (!url.indexOf(path)) throw pub.cannot_get_ref(url,"missing path string that can be found in given url");
         
         return pub.url_to_path(url).substr((path.length * -1));
      };
      
   
      
   
      /**
       * checks given response document is valid
       * @return {Boolean} true if document is valid. false otherwise.
       * @method flat.api.is_valid_response()
       * @throws response_not_object
       */
      pub.is_valid_response = function(params,response) {
         if (!flat.is_object(response)) throw pub.response_not_object;
         if (params.props) {
            try {
               pub.check_response_props(params.props,response);
            } catch(e) {
               if (e==pub.props_arg_invalid) {
                  //flat.debug(params.props,"props param invalid");
                  throw e;
               }
               if (e==pub.missing_expected_property) {
                  if (log_missing_response_property) log(
                     "response missing property: "+e.get_property()
                  );
                  return false;
               }
               throw e;
            }
         }
         
      };
      /**
       * checks if set of properties exist in response document
       * 
       * @method check_response_props
       * @return {Void}
       * @param array props properties to check exist in response document
       * @param object response response document
       * @throws flat.response_not_object 
       * @throws flat.missing_expected_property
       */
      pub.check_response_props = function(props,response) {
         //flat.debug(response);
         if (!flat.is_array(props)) {
            //flat.debug("props arg is not array");
            throw pub.props_arg_invalid;
         }
         
         if (!flat.is_object(response)) throw pub.response_not_object;
         
         for(i=0;i<props.length;i++) if (!response[props[i]]) { 
            throw pub.missing_expected_property(props[i]);
         }
      };
      
      var evcb = {}; // hashmap of event handlers by event name
      var evh = {}; // hashmap of event handlers by event name
      var evdone = []; // array of each event triggered at least one time
      var evdata = {}; // hashmap of event trigger data
      var evonce = {};
      var evfb = {};
      
      var execute_cb = function(evname, handler, data) {
         if (flat.is_func(evh[evname])) {
            evh[evname].call({}, handler, data);
            return;
         }
         handler.call({},data);
      };
      
      /**
       * Registers an event handler that is executed each time an 
       * event is triggered only if no other handlers
       * have been registered for the event.
       * 
       * @param {string} event space separated event names
       * @param {string} handler callback signature: function(data)
       */
      pub.fallback = function(event, handler) {
         if (typeof handler !== 'function') return;
         if (typeof event !== 'string' && !event instanceof String) return;
         event.split(' ').forEach(function(evname) {
            if (typeof evcb[evname] !== 'undefined' && evcb[evname].length) return;
            if (typeof evonce[evname] !== 'undefined' && evonce[evname].length) return;
            evfb[evname] = handler;
         });
      };
      
      pub.off = function(event, handler) {
         if (typeof event !== 'string' && !event instanceof String) return;
         event.split(' ').forEach(function(evname) {
            if (typeof handler === 'function') {
               if (evcb[evname]!=='undefined') {
                  for (var i = 0; i < evcb[evname].length; i++) {
                     if (handler===evcb[evname][i]) {
                        delete evcb[evname][i];
                     }
                  }
                  delete i;
               }
               if (evonce[evname]!=='undefined') {
                  for (var i = 0; i < evonce[evname].length; i++) {
                     if (handler===evonce[evname][i]) {
                        delete evonce[evname][i];
                     }
                  }
                  delete i;
               }
            } else {
               delete evcb[evname];
               delete evonce[evname];
            }
         });
      };
      
      /**
       * Registers an event handler that is executed each time an event
       *   is triggered; if the event has already been triggered, 
       *   the handler is executed immediately.
       *   
       * @param {string} event space separated event names
       * @param {string} handler callback signature: function(data)
       */
      pub.on = function(event, handler) {
         if (typeof handler !== 'function') return;
         if (typeof event !== 'string' && !event instanceof String) return;
         event.split(' ').forEach(function(evname) {
            if (evdone.indexOf(evname) !== -1) {
              return execute_cb(evname, handler, evdata[evname]);
            }
            if (typeof evcb[evname] === 'undefined') evcb[evname] = [];
            evcb[evname].push(handler);
         });
      };
      
      /**
       * Registers an event handler that is executed each time an event
       *   is triggered in the future.
       *   
       * @param {string} event space separated event names
       * @param {string} handler callback signature: function(data)
       */
      pub.listen = function(event, handler) {
         if (typeof handler !== 'function') return;
         if (typeof event !== 'string' && !event instanceof String) return;
         event.split(' ').forEach(function(evname) {
            if (typeof evcb[evname] === 'undefined') evcb[evname] = [];
            evcb[evname].push(handler);
         });
      };
      
      /**
       * Registers an event handler that is executed only the first time an event
       *   is triggered, if it has already been triggered, the handler is executed
       *   immediately.
       *   
       * @param {string} event space separated event names
       * @param {string} handler callback signature: function(data)
       */
      pub.once = function(event, handler) {
         if (typeof handler !== 'function') return;
         if (typeof event !== 'string' && !event instanceof String) return;
         event.split(' ').forEach(function(evname) {
            if (evdone.indexOf(evname) !== -1) {
               return execute_cb(evname, handler, evdata[evname]);
            }
            if (typeof evonce[evname] === 'undefined') evonce[evname] = [];
            evonce[evname].push(handler);
         });
      };
      
      /**
       * Executes all behavior associated with an event.
       * 
       * @param {string} event space separated event names
       * @param {object} data to be passed to event handlers
       */
      var trigger = function(event, data) {
        if (typeof event !== 'string' && !event instanceof String) return;
        evdone.indexOf(event) === -1 && evdone.push(event);
        if (typeof data !== 'undefined') {
           evdata[event] = data;
        } else {
           delete evdata[event];
        }
        event.split(' ').forEach(function(evname) {
           var i, foundCb = false;
           if (typeof evcb[evname] !== 'undefined' && evcb[evname].length) {
              foundCb = true;
              for (i = 0; i < evcb[evname].length; i++) {
                execute_cb(evname, evcb[evname][i], data);
              }
           }
           if (typeof evonce[evname] !== 'undefined' && evonce[evname].length) {
              foundCb = true;
              for (i = 0; i < evonce[evname].length; i++) {
                 execute_cb(evname, evonce[evname][i], data);
              }
              delete evonce[evname];
           }
           if (!foundCb && typeof evfb[evname] !== 'undefined') {
              foundCb = true;
              if (typeof evh[evname] === 'function') {
                 evh[evname].call({},data, evfb[evname]);
              } else {
                 evfb[evname].call({}, data);
              }
           }
           if (!foundCb && typeof evh[evname] === 'function') {
              evh[evname].call({},data, function(){});
           }
        });
      };
      
      /**
       * executes a flat/api request
       *    callback signature: callback(data,status,response)
       * 
       * @method flat.api.request
       * @return {Void}
       * @async
       * 
       * @param {String|Object} path_or_params path or params object
       * @param {Object|Function} data_or_callback (optional) data object to give flat/api, or callback function
       * @param {Function} callback_if_data (optional) function called after response received; ignored unless 2nd arg is object
       * 
       * @throws "cannot_determine_url"
       * @throws flat.response_not_object 
       * @throws flat.missing_expected_property
       */
      pub.request = function(path_or_params,data_or_callback,callback_if_data) {
         /*
          * default parameters object for this function
          *    can be explicitly given as only argument
          */
         var params = {
            /**
             * relative flat/api request
             * @property path
             * @type String
             * @optional
             */
            path : '',
            /**
             * full URL for api request
             * @property url
             * @type String
             * @optional
             */
            url : '',
            /**
             * HTTP request method
             * @property type
             * @type String
             * @optional
             * @default "GET"
             */
            type : 'GET',
            /**
             * data to provide to flat/api request
             * @property data
             * @type Any
             * @optional
             */
            data : '',
            /**
             * function called after response received.
             *    signature: function(data,status,response)
             * @property callback
             * @type Function 
             * @optional
             */
            callback : '',
            
            success : null,
            error : null,
            
            always : null,
            /**
             * response properties expected to exist
             * @property response_properties
             * @type Object
             * @optional
             * 
             */
            response_properties : '',
            
            send_JSON : true,
            
            withCredentials : false,
         };
         /*
          * determine params from function arguments
          *    (if not given params object)
          */      
         var param_arg = false;
         if (arguments.length==1) {
            if (flat.is_object(path_or_params)) {
               for (var prop in path_or_params) {
                   if (path_or_params.hasOwnProperty(prop)) {
                       if (params.hasOwnProperty(prop)) {
                          param_arg = true;
                          params[prop] = path_or_params[prop];
                          //flat.debug(prop,'path or params prop');
                       }
                   }
               }
            }
         }
         
         /*
          * determine data object and callback function:
          *    if given params object (means only 1 argument given):
          *       callback is the 'params.callback' property if it's a function
          *    if 2nd arg exists and is function:
          *       it is param.callback.
          *    if 2nd arg exists and is object:
          *       2nd arg is param.data
          *    if 3rd arg exists and 2nd arg was object:
          *       3rd arg is param.callback
          */
         if (!param_arg) {
            params.path = path_or_params;
            if (flat.is_func(data_or_callback)) {
               params.callback = data_or_callback;
            } else {
               if (data_or_callback) {
                  
                  if (flat.is_func(data_or_callback)) {
                     params.callback = data_or_callback;
                  } else {
                     params.data = data_or_callback;
                     if (flat.is_func(callback_if_data)) {
                        params.callback = callback_if_data;
                     }
                  }
               }
            }
         }
         
         
         /*
          * determine callback:
          *    if param.callback is function, it is callback
          *       otherwise
          *    callback is empty anonymous function
          */
         var callback;
         if (params.callback && flat.is_func(params.callback)) {
            callback = params.callback;
         }
         
         /*
          * determine url for ajax request
          */
         var url = '';
         if (params.url) {
            url = params.url;
         }
         if (!url) {
            if (params.path) {
               url = pub.get_url(params.path);
            } else
            if (path_or_params) {
               url = pub.get_url(path_or_params);
            }
         }
         if (!url) throw "cannot_determine_url";
         
         /*
          * prepare config object for jquery ajax request
          */
         var conf = {
            url: url,
            type: params.type.toUpperCase(),
            timeout: ajax_timeout,        
            async: true
         };
         /*
          * if data provided, add that to config object
          */
         if (params.data) {
            if (params.send_JSON && (conf.type!='GET')) {
               conf.data = JSON.stringify(params.data);
               conf.contentType= 'application/json; charset=UTF-8';
            } else {
               conf.data = params.data;
            }
         }
         if (params.withCredentials) {
            conf.xhrFields = {
               withCredentials: true
            };
         }
         //var url = pub.url(slug);
         ////flat.debug(conf.data,'flat api conf data');
         /*
          * execute jquery ajax reuqest
          */
         var req = $.ajax(conf);
         
         /*
          * response handler for jquery ajax request
          *    for consistency, make response into an object to matter what
          */
         req.always(function(response,status) {
            //flat.debug(status,'channel status for '+url);
            var data = {};
            if (!flat.is_object(response)) {
               data = response;
               response = {
                  status : status,
               };
               if (flat.is_string(data)) {
                  response.data = data;
               }
            } else {
               if (response.responseJSON) {
                  response = response.responseJSON;
                  if (response.data) {
                     data = response.data;
                  } else {
                     data = response;
                  }
               } else 
               if (response.responseXML) {
                  var xmlDoc = response.responseXML;
                  var rns = "https://github.com/katmore/flat/wiki/xmlns";
                  var etop,edata = xmlDoc.getElementsByTagNameNS(rns,"data");
                  if (edata.length) {
                     etop = edata[0];
                     var meta = etop.getAttributeNS(rns,'meta');
                     if (meta && (meta=="flat\\error_collection")) {
                        var errnode = etop.getElementsByTagNameNS(rns+'-object',"error");
                        if (errnode && errnode.length) {
                           var errdata = errnode[0].getElementsByTagNameNS(rns,"data");
                           if (errdata && errdata.length) {
                              var prop=['type','message','name','code'];
                              for(var i=0;i<prop.length;i++) {
                                 var pval = errdata[0].getElementsByTagNameNS(rns+'-object',prop[i]);
                                 if (pval && pval.length && pval[0].childNodes && pval[0].childNodes.length) {
                                    data[prop[i]] = pval[0].childNodes[0].nodeValue;
                                 }
                              }
                           }
                        }
                     }
                  }
               } else {
                  if (response.data) {
                     data = response.data;
                  } else {
                     data = response;
                  }
               }
            }
            if (status=='success') {
               
               trigger('success.response',data);
               
               if (data && response.checksum && response.status && response.status_code) {
                  if (params.success && flat.is_func(params.success)) {
                     params.success(data, {status : response.status, code : response.status_code }, response.checksum );
                  }
               }
               
            } else {
               if (params.error && flat.is_func(params.error)) {
                  
                  if (data && data.message && flat.is_string(data.message)) {
                     
                     params.error(data.message,data,response);
                  } else {
                     console.log('WARNING: response is missing error message field');
                     //console.debug(data);
                     params.error(status,data, response);
                  }
               }
            }
            
            if (callback || flat.is_func(params.always)) {
               if (callback) {
                  callback(data,status,response);
               }
               if (flat.is_func(params.always)) {
                  //var always = params.always;
                  params.always(data,status,response);
               }
            } else {
               if (status!='success') {
                  if (!(params.error && flat.is_func(params.error))) {
                     if (data && data.message) {
                        throw data.message;
                     } else {
                        throw "request";
                     }
                  } else {
                     return;
                  }
                  console.log("WARNING: unhandled response status: "+status);
                  throw status;
               }
            }
         });
      };
      return pub;
   }()));


})();
