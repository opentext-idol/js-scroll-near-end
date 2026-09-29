/* Example Uses:

$('.scrollableArea').scrollNearEnd({
  offset: 500 // When scrolled <= 500px from the bottom
});

$('.scrollableArea').scrollNearEnd(function () {
  //  Response
});

$('.scrollableArea').on('scrollNearEnd', function () {
  //  Response
});

$('.scrollableArea').scrollNearEnd({
  offset: 200,
  event: function (event, data) {
    //  Response, use data.offset to find out how close we are to the bottom
  }
});

Default offset is 1000px

*/

/**
 * The scrollNearEnd jQuery Plugin
 * @author: Liam Goodacre
 * @date: 2012-10-17
 */
'use strict';

const $ = require('jquery');

var ID = 'scrollNearEnd';
var defaultOptions = {
  offset: 1000
};
/* Binds to the scroll event of the element,
 * raises a scrollNearEnd event when appropriate.
 * The offset from the bottom is passed as an event argument. */
var bind = function ($this) {
  $this.on('scroll', function () {
    var offset, heighDiff, scrollTop;
    offset = +($this.data(ID) || defaultOptions).offset;
    heighDiff = $this[0].scrollHeight - $this.height();
    scrollTop = $this.scrollTop();
    if (heighDiff <= (scrollTop + offset)) {
      $this.trigger(ID, {offset: (heighDiff - scrollTop)});
    }
  });
};
/* The plugin entry point */
$.fn[ID] = function (_input) {
  var type, options;
  type = $.type(_input);
  //  If we're given an object
  if (type === 'object') {
    //  Ensure all the relevant properties exist
    options = $.extend({}, defaultOptions, _input);
    //  If we're given an event property
    if (options.event) {
      //  Bind the events
      this.on(ID, options.event);
    }
    //  For each
    return this.each(function () {
      //  If we haven't already processed the item
      var $this = $(this);
      if (!$this.data(ID)) {
        //  Bind for scrolling detection
        bind($this);
      }
    }).data(ID, options); // Attach the options to the element
  }
  if (type === 'function') {
    return this.on(ID, _input);
  }
};