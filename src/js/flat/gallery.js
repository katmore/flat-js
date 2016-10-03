/**
 * provides flat.gallery class definition
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
flat.gallery = (function() {
   var config = {
      end_msg : "no more images",
      loading_img : "https://i.imgur.com/6RMhx.gif",
      loading_msg : "loading...",
      nav_sel : ".gallery-nav",
      next_sel : ".gallery-next",
      status_sel : ".gallery-status",
      img_sel : ".gallery-item",
      gallery_sel : ".image-gallery",
      masonry_enabled : true,
   };
   var pub = {};
   var priv = {};
   pub.activate = function(params) {
      if (flat.is_object(params)) {
         for (var prop in params) {
            if (config.hasOwnProperty(prop)) {
               config[prop] = params[prop];
            }
         }
      }
      var cfg = '';
      if (cfg = $(config.status_sel).find(".end_msg").html()) {
         config.end_msg = cfg;
      }
      if (cfg = $(config.status_sel).find(".loading_img").attr('src')) {
         config.loading_img = cfg;
      }
      if (cfg = $(config.status_sel).find(".loading_msg").html()) {
         config.loading_msg = cfg;
      }
        $(function(){
         
         /*
          * run imagesLoaded and infinite scroll
          */
      
          var $container = $(config.gallery_sel);
          if (config.masonry_enabled) {
             $container.imagesLoaded(function(){
               $container.masonry({
                 itemSelector: config.img_sel,
                  isFitWidth: true
               });
             });
          }
          $container.infinitescroll({
            navSelector  : config.nav_sel,    // selector for the paged navigation
            nextSelector : config.next_sel,  // selector for the NEXT link (to page 2)
            itemSelector : config.img_sel,     // selector for all items you'll retrieve
            loading: {
                finishedMsg: config.end_msg,
              img: config.loading_img,
              msgText:config.loading_msg,
              speed: 'slow',
         
              }
            },
            // trigger Masonry as a callback
            function( newElements ) {
              // hide new items while they are loading
              var $newElems = $( newElements ).css({ opacity: 0 });
              // ensure that images load before adding to masonry layout
              $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({ opacity: 1 });
                if (config.masonry_enabled)
                   $container.masonry( 'appended', $newElems, true );
              });
            }
          );
      
        });
      
   };
   
   return pub;
})();










































