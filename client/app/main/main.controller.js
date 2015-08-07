'use strict';

angular.module('sharingsmilesApp')

  .controller('MainCtrl', function ($scope, $http,socket ) {
skrollr.init({
    forceHeight: false
});



/*!
 * Plugin for skrollr.
 * This plugin makes hashlinks scroll nicely to their target position.
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function(document, window) {
  'use strict';

  var DEFAULT_DURATION = 500;
  var DEFAULT_EASING = 'sqrt';

  var MENU_TOP_ATTR = 'data-menu-top';
  var MENU_OFFSET_ATTR = 'data-menu-offset';

  var skrollr = window.skrollr;
  var history = window.history;
  var supportsHistory = !!history.pushState;

  /*
    Since we are using event bubbling, the element that has been clicked
    might not acutally be the link but a child.
  */
  var findParentLink = function(element) {
    //Yay, it's a link!
    if(element.tagName === 'A') {
      return element;
    }

    //We reached the top, no link found.
    if(element === document) {
      return false;
    }

    //Maybe the parent is a link.
    return findParentLink(element.parentNode);
  };

  /*
    Handle the click event on the document.
  */
  var handleClick = function(e) {
    //Only handle left click.
    if((e.which || e.button) !== 1) {
      return;
    }

    var link = findParentLink(e.target);

    //The click did not happen inside a link.
    if(!link) {
      return;
    }

    if(handleLink(link)) {
      e.preventDefault();
    }
  };

  /*
    Handles the click on a link. May be called without an actual click event.
    When the fake flag is set, the link won't change the url and the position won't be animated.
  */
  var handleLink = function(link, fake) {
    //Don't use the href property (link.href) because it contains the absolute url.
    var href = link.getAttribute('href');

    //Check if it's a hashlink.
    if(!/^#/.test(href)) {
      return false;
    }

    //Now get the targetTop to scroll to.
    var targetTop;

    //If there's a data-menu-top attribute, it overrides the actuall anchor offset.
    var menuTop = link.getAttribute(MENU_TOP_ATTR);

    if(menuTop !== null) {
      targetTop = +menuTop;
    } else {
      var scrollTarget = document.getElementById(href.substr(1));

      //Ignore the click if no target is found.
      if(!scrollTarget) {
        return false;
      }

      targetTop = _skrollrInstance.relativeToAbsolute(scrollTarget, 'top', 'top');

      var menuOffset = scrollTarget.getAttribute(MENU_OFFSET_ATTR);

      if(menuOffset !== null) {
        targetTop += +menuOffset;
      }
    }

    if(supportsHistory && !fake) {
      history.pushState({top: targetTop}, '', href);
    }

    //Now finally scroll there.
    if(_animate && !fake) {
      _skrollrInstance.animateTo(targetTop, {
        duration: _duration(_skrollrInstance.getScrollTop(), targetTop),
        easing: _easing
      });
    } else {
      defer(function() {
        _skrollrInstance.setScrollTop(targetTop);
      });
    }

    return true;
  };

  var defer = function(fn) {
    window.setTimeout(fn, 1);
  };

  /*
    Global menu function accessible through window.skrollr.menu.init.
  */
  skrollr.menu = {};
  skrollr.menu.init = function(skrollrInstance, options) {
    _skrollrInstance = skrollrInstance;

    options = options || {};

    _easing = options.easing || DEFAULT_EASING;
    _animate = options.animate !== false;
    _duration = options.duration || DEFAULT_DURATION;

    if(typeof _duration === 'number') {
      _duration = (function(duration) {
        return function() {
          return duration;
        };
      }(_duration));
    }

    //Use event bubbling and attach a single listener to the document.
    skrollr.addEvent(document, 'click', handleClick);

    if(supportsHistory) {
      window.addEventListener('popstate', function(e) {
        var state = e.state || {};
        var top = state.top || 0;

        defer(function() {
          _skrollrInstance.setScrollTop(top);
        });
      }, false);
    }
  };

  //Private reference to the initialized skrollr.
  var _skrollrInstance;

  var _easing;
  var _duration;
  var _animate;

  //In case the page was opened with a hash, prevent jumping to it.
  //http://stackoverflow.com/questions/3659072/jquery-disable-anchor-jump-when-loading-a-page
  defer(function() {
    if(window.location.hash) {
      window.scrollTo(0, 0);

      if(document.querySelector) {
        var link = document.querySelector('a[href="' + window.location.hash + '"]');

        if(link) {
          handleLink(link, true);
        }
      }
    }
  });
}(document, window));

var s = skrollr.init(/*other stuff*/);

//The options (second parameter) are all optional. The values shown are the default values.
skrollr.menu.init(s, {
    //skrollr will smoothly animate to the new position using `animateTo`.
    animate: true,

    //The easing function to use.
    easing: 'sqrt',

    //How long the animation should take in ms.
    duration: function(currentTop, targetTop) {
        //By default, the duration is hardcoded at 500ms.
        return 1000;

        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
        //return Math.abs(currentTop - targetTop) * 10;
    },
});
/* Pure JS - no libraries included */

var changeDuration = 750;
var bounceDuration = 1250;
var clickable = true;

var smile = document.querySelector('.smile');
var currentSmile = 0;
var images = smile.querySelectorAll('img');
var eyes = smile.querySelectorAll('.eye')

function hideImages(){
  for(var i = 0, j = images.length; i < j; i++){
    images[i].classList.remove('display');
  }
}

smile.onclick = function(){
  if (clickable){
    cursorImage.classList.add('up');
    setTimeout(function(){
      cursorImage.classList.remove('up');
    }, 300);
    currentSmile++;
    clickable = false;

    smile.classList.add('changeMe');

    setTimeout(function(){
        if (currentSmile === images.length){
          currentSmile = 0;
          eyes[0].classList.remove('reallySad');
          eyes[1].classList.remove('reallySad');
        } else if (currentSmile === images.length - 1){
          eyes[0].classList.add('reallySad');
          eyes[1].classList.add('reallySad');
        }  
      
        hideImages();
        images[currentSmile].classList.add('display');
    },changeDuration/1.4);

    setTimeout(function(){
      smile.classList.add('bounce');
      smile.classList.remove('changeMe');
      setTimeout(function(){
        smile.classList.remove('bounce');
        clickable = true;
      }, bounceDuration);
    }, changeDuration);
  }
}

var cursorImage = document.getElementById('cursorImage');
document.onmousemove = function(e){
  cursorImage.style.top = e.y-30+"px";
  cursorImage.style.left = e.x-40+"px";
}

    
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
