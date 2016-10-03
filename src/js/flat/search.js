/**
 * provides flat.search class definition
 *
 * ECMAScript version:
 *    ECMA-262, 5th edition
 *
 * LICENSE: Copyright (c) 2012-2014 Garrison Koch, Doug Bird, and Daniel Lepthien.
 * All Rights Reserved. Permission for these works to be distributed, viewed, or utilized in any
 * way is expressly forbidden without the prior written consent from the copyright
 * holders. All works herein are considered to be trade secrets, and as such are afforded 
 * all criminal and civil protections as applicable to trade secrets.
 * 
 * author:     D. Bird
 * copyright:  Copyright (c) 2012-2014 Garrison Koch, Doug Bird, and Daniel Lepthien. All Rights Reserved.
 * 
 * YUIDoc Syntax for DocBlocks
 * @see http://yui.github.io/yuidoc/syntax/index.html
 * 
 * @module flat
 */
/**
 * activepitch search controller
 * 
 * @author D. Bird
 * @class pub
 * @static
 * @beta
 */
if (!flat) throw "flat class missing";
flat.search = (function() {
   var pub = {};
   var priv = {};
   pub.result = (function() {
      var pub = function(link,image,heading,detail) {
         this.link = '';
         if (link) this.link = link;
         
         this.image = '';
         if (image) this.image = image;
         
         this.heading = '';
         if (heading) this.heading = heading;
         
         this.detail = '';
         if (detail) this.detail = detail;
      };
      pub.prototype = {};
      return pub;
   })();
   priv.result_list_html = '';
   pub.hide_results = function() {
      $(".search-result, .search-results-nothing").hide();
      $(".search-result").html('');
      priv.result_list_html='';
      
   };
   pub.show_results = function() {
      var ul = $(".search-result");
      ul.html(priv.result_list_html);
      priv.result_list_html = '';
      ul.listview( "refresh" );
      ul.trigger( "updatelayout");
      $(".search-item-loading-container").hide();
      ul.show();
   };
   pub.show_nothing = function() {
      $(".search-item-loading-container").hide();
      $(".search-results-nothing").show();
   };
   pub.show_loading = function() {
      pub.hide_results();
      $(".search-item-loading-container").show();
   };
   pub.add_result = function(result) {
      /*
       * clone stub
       */
      var li = $(".search-item-prototype-container").clone();
      li.find(".search-item-link").attr('href',result.link);
      li.find(".search-item-image").attr('src',result.image);
      li.find(".search-item-heading").html(result.heading);
      li.find(".search-item-detail").html(result.detail);
      li.find(".search-item-prototype").addClass("search-item");
      li.find(".search-item-prototype").removeClass("search-item-prototype");
      
      //flat.debug(li.html(),'list html');
      /*
       * add item to ongoing html
       */
      priv.result_list_html += li.html();
   };
   pub.config = {
      min_len : 3,
      max_results: 5,
   };
   pub.activate = function(config) {
      if (!config) var config = pub.config;
      $(function() {
         $( ".searchy" ).on( "change",function() {
            if (!$( this).val()) {
               $(".unity-content").show();
               pub.hide_results();
            }
         });
         $( ".searchy" ).on( "keyup" , config , function ( e, data ) {
            var value = $( this).val();
            $(".unity-content").hide();
            if ( value && value.length >= config.min_len ) {
               pub.show_loading();
               flat.api.request("activepitch/search/artist",{q:value,max:config.max_results},function(data,status,response) {
                  if (status=='success') {
                     //flat.debug(data,'response data');
                     if (data.artist && flat.is_array(data.artist)) {
                        //flat.debug('artist is array');
                        var artist = {};
                        if (!data.artist.length) {
                           /*
                            * no results
                            */
                           pub.show_nothing();
                        } else {
                           for(var i=0;i<data.artist.length;i++) {
                              artist = data.artist[i];
                              pub.add_result(
                                 new pub.result(
                                 'https://activepitch.com/profile.php?public='+artist.id,
                                 artist.headshot.thumb,
                                 artist.display_name,
                                 artist.code + ': a' + artist.id
                                 )
                              );
                           }
                           pub.show_results();
                        }
                     } else {
                        
                        /*
                         * no results
                         */
                        pub.show_nothing();
                        
                     }
                     
                  }
               });
            } else { //shorter than min len
               /*
                * hide results
                */
               pub.hide_results();
               if (!$( this).val()) {
                  $(".unity-content").show();
               }
            }
         });
         $(".hdr-srch").show();
      });
   };
   return pub;
})();










