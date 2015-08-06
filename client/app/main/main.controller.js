'use strict';

angular.module('sharingsmilesApp')
  .controller('MainCtrl', function ($scope, $http,socket ) {
infographic={};
  var d3 =infographic;  /* Pure JS - no libraries included */
infographic( function( d3 ) {
  var data = [
    {
      date  : 'September 15',
      value : 515,
      type  : 'Music'
    },
    {
      date  : 'September 16',
      value : 618,
      type  : 'Music'
    },
    {
      date  : 'September 17',
      value : 498,
      type  : 'Music'
    },
    {
      date  : 'September 18',
      value : 1243,
      type  : 'Music'
    },
    {
      date  : 'September 19',
      value : 1033,
      type  : 'Music'
    },
    {
      date  : 'September 15',
      value : 135,
      type  : 'Photos'
    },
    {
      date  : 'September 16',
      value : 218,
      type  : 'Photos'
    },
    {
      date  : 'September 17',
      value : 798,
      type  : 'Photos'
    },
    {
      date  : 'September 18',
      value : 643,
      type  : 'Photos'
    },
    {
      date  : 'September 19',
      value : 533,
      type  : 'Photos'
    },
    {
      date  : 'September 15',
      value : 846,
      type  : 'Files'
    },
    {
      date  : 'September 16',
      value : 218,
      type  : 'Files'
    },
    {
      date  : 'September 17',
      value : 428,
      type  : 'Files'
    },
    {
      date  : 'September 18',
      value : 843,
      type  : 'Files'
    },
    {
      date  : 'September 19',
      value : 333,
      type  : 'Files'
    }
  ];
  /**
   * Function to kick of all fancy download circles
   */
  function visualizeDownloadCircles ( selector ) {

    var d3items    = d3.selectAll( selector ),
        d3graphics = d3items.select( '.ui__downloadList__graphic' ),
        
        svgElements;

    // remove old svg for the case there was one
    d3graphics.select( 'svg' ).remove();

    d3items.each( function( svg, index ) { 
      var d3item = d3.select( this );
          
      index++;
      
      drawDownloadCircle( d3item, index );
    } );
  }
  
  /**
   * Function to draw one particular 
   * download circle
   */
  function drawDownloadCircle( d3item, index ) {
    var d3container = d3item.select( '.ui__downloadList__graphic' ),
        value       = d3item.attr( 'data-value' ),
        type        = d3item.attr( 'data-type' ),
        width       = d3container.attr( 'width' ),
        height      = d3container.attr( 'height' ),
        
        // circle stuff
        twoPi  = 2 * Math.PI,
        radius = Math.min( width, height ) / 2 - 5,
        arcBackground = d3.svg.arc()
                          .startAngle( 0 )
                          .endAngle( function( d ) { return d.value * twoPi; } )
                          .outerRadius( radius - 10 )
                          .innerRadius( radius - 35 ),
        arcForeground = d3.svg.arc()
                          .startAngle( 0 )
                          .endAngle( function( d ) { return d.value * twoPi; } )
                          .outerRadius( radius )
                          .innerRadius( radius - 27 ),
        
        // value stuff
        currentValue = 0,
        progress     = 0,
        
        // animation stuff,
        duration = 3000;
    
    // string to number
    value = +value;
        
    // append new svg
    var svg = d3container.append( 'svg' )
                          .attr( 'width', width )
                          .attr( 'height', height )
                          .append( 'g' )
                          .attr(
                            'transform',
                            'translate(' + width / 2 + ',' + height / 2 + ')'
                          );
    
    // filter stuff
    /* For the drop shadow filter... */
    var defs = svg.append( 'defs' );

    var filter = defs.append( 'filter' )
                      .attr( 'id', 'dropshadow' )

    filter.append( 'feGaussianBlur' )
          .attr( 'in', 'SourceAlpha' )
          .attr( 'stdDeviation', 2 )
          .attr( 'result', 'blur' );
    filter.append( 'feOffset' )
          .attr( 'in', 'blur' )
          .attr( 'dx', 2 )
          .attr( 'dy', 3 )
          .attr( 'result', 'offsetBlur' );

    var feMerge = filter.append( 'feMerge' );

    feMerge.append( 'feMergeNode' )
            .attr( 'in", "offsetBlur' )
    feMerge.append( 'feMergeNode' )
            .attr( 'in', 'SourceGraphic' );
    // end filter stuff
    
    // gradient stuff    
    var gradientBackgroundRed = defs.append( 'linearGradient' )
                                    .attr( 'id', 'gradientBackgroundRed' )
                                    .attr( 'x1', '0' )
                                    .attr( 'x2', '0' )
                                    .attr( 'y1', '0' )
                                    .attr( 'y2', '1' );
    gradientBackgroundRed.append( 'stop' )
                        .attr( 'class', 'redBackgroundStop1' )
                        .attr( 'offset', '0%' );
    
    gradientBackgroundRed.append( 'stop' )
                        .attr( 'class', 'redBackgroundStop2' )
                        .attr( 'offset', '100%' ); 

    var gradientBackgroundPurple = defs.append( 'linearGradient' )
                                      .attr( 'id', 'gradientBackgroundPurple' )
                                      .attr( 'x1', '0' )
                                      .attr( 'x2', '0' )
                                      .attr( 'y1', '0' )
                                      .attr( 'y2', '1' );
    
    gradientBackgroundPurple.append( 'stop' )
                            .attr( 'class', 'purpleBackgroundStop1' )
                            .attr( 'offset', '0%' );
    
    gradientBackgroundPurple.append( 'stop' )
                            .attr( 'class', 'purpleBackgroundStop2' )
                            .attr( 'offset', '100%' ); 

    var gradientBackgroundCyan = defs.append( 'linearGradient' )
                                    .attr( 'id', 'gradientBackgroundCyan' )
                                    .attr( 'x1', '0' )
                                    .attr( 'x2', '0' )
                                    .attr( 'y1', '0' )
                                    .attr( 'y2', '1' );
    
    gradientBackgroundCyan.append( 'stop' )
                          .attr( 'class', 'cyanBackgroundStop1' )
                          .attr( 'offset', '0%' );
    
    gradientBackgroundCyan.append( 'stop' )
                          .attr( 'class', 'cyanBackgroundStop2' )
                          .attr( 'offset', '100%' );     

    var gradientForegroundRed = defs.append( 'linearGradient' )
                                    .attr( 'id', 'gradientForegroundRed' )
                                    .attr( 'x1', '0' )
                                    .attr( 'x2', '0' )
                                    .attr( 'y1', '0' )
                                    .attr( 'y2', '1' );
    gradientForegroundRed.append( 'stop' )
                        .attr( 'class', 'redForegroundStop1' )
                        .attr( 'offset', '0%' );
    
    gradientForegroundRed.append( 'stop' )
                        .attr( 'class', 'redForegroundStop2' )
                        .attr( 'offset', '100%' ); 

    var gradientForegroundPurple = defs.append( 'linearGradient' )
                                        .attr( 'id', 'gradientForegroundPurple' )
                                        .attr( 'x1', '0' )
                                        .attr( 'x2', '0' )
                                        .attr( 'y1', '0' )
                                        .attr( 'y2', '1' );
    
    gradientForegroundPurple.append( 'stop' )
                .attr( 'class', 'purpleForegroundStop1' )
                .attr( 'offset', '0%' );
    
    gradientForegroundPurple.append( 'stop' )
                .attr( 'class', 'purpleForegroundStop2' )
                .attr( 'offset', '100%' ); 

    var gradientForegroundCyan = defs.append( 'linearGradient' )
                            .attr( 'id', 'gradientForegroundCyan' )
                            .attr( 'x1', '0' )
                            .attr( 'x2', '0' )
                            .attr( 'y1', '0' )
                            .attr( 'y2', '1' );
    
    gradientForegroundCyan.append( 'stop' )
                .attr( 'class', 'cyanForegroundStop1' )
                .attr( 'offset', '0%' );
    
    gradientForegroundCyan.append( 'stop' )
                .attr( 'class', 'cyanForegroundStop2' )
                .attr( 'offset', '100%' );     
    // end gradient stuff
    
    

    var meter = svg.append( 'g' )
                    .attr( 'class', 'progress-meter' );
    
    meter.append( 'title' )
          .text( 'Progress meter showing amount of space used for ' + type );
    
    meter.data(
            [
              { value : .0,  index : .5 }
            ]
          )
          .append( 'path' )
          .attr( 'class', 'ui__downloadList__backgroundCircle' )
          .attr( 'd', arcBackground )
          .attr( 'filter', 'url(#dropshadow)' )
          .transition()
          .duration( duration )
          .attrTween( 'd', tweenArcBackground( { value : 1 } ) );
    

    var foreground = meter.data(
                            [
                              { value : .0, index: .5 }
                            ]
                          )
                          .append( 'path' )
                          .attr( 'stroke', '#fff' )
                          .attr( 'class', 'ui__downloadList__foregroundCircle' )
                          .attr( 'd', arcForeground )
                          .attr( 'filter', 'url(#dropshadow)' )
                          .transition()
                          .attr( 'stroke', '#aaa' )
                          .delay( 1000 * index )   
                          .duration( duration )
                          .attrTween( 'd', tweenArcForeground({ value : value / 1000 } ) );
    
    
    meter.data( [ 0 ] )
          .append( 'text' )
          .text ( 0 )
          .attr( 'font-size', '25px' )
          .attr( 'x', 0 )
          .attr( 'y', 0 )
          .attr( 'fill', '#fff' )
          .attr( 'text-anchor', 'middle' )
          .attr( 'filter', 'url(#dropshadow)' )
          .transition()
          .delay( 1000 * index )
          .duration( duration )
          .tween( 'text', tweenText( value ) );
   
    meter.append( 'text' )
          .attr( 'fill', '#fff' )
          .attr( 'x', 0 )
          .attr( 'y', 20 ) 
          .attr( 'text-anchor', 'middle' )
          .attr( 'filter', 'url(#dropshadow)' )
          .text( 'mb' );

    
    // Helper functions!!!
    function tweenArcForeground( b ) {
      return function( a ) {
        var i = d3.interpolate( a, b );

        return function( t ) {
          return arcForeground( i ( t ) );
        };
      };
    }
    
    function tweenArcBackground( b ) {
      return function( a ) {
        var i = d3.interpolate( a, b );

        return function( t ) {
          return arcBackground( i ( t ) );
        };
      };
    }
    
    function tweenText( b ) {
      return function( a ) {
        var i = d3.interpolateRound( a, b );

        return function(t) {
          this.textContent = i(t);
        };
      }
    }
  }
  
  /**
   * Function to kick off drawing
   * the timeline graphic
   */
  function visualizeDownloadTimeline( selector, data ) {
    var d3container = d3.select( selector ),
        width       = d3container.attr( 'width' ),
        height      = d3container.attr( 'height' ),
        margin      = { top : 5, right : 0, bottom : 30, left : 0 },
        svg         = d3container.append( 'svg' )
                                  .attr( 'height', height )
                                  .attr( 'width', width ),
    
        x     = d3.scale.ordinal()
                        .rangeRoundBands( [ 0, width ] )
                        .domain(
                          data.map( function( d ) { return d.date; } )
                        ),
        xAxis = d3.svg.axis().scale( x ).orient( 'bottom' ),
        
        y     = d3.scale.linear()
                        .range( [ height - margin.bottom * 1.5, margin.top ] )
                        .domain(
                          [ 0, d3.max( data, function( d ) { return d.value; } ) ]
                        ),
        yAxis = d3.svg.axis().scale( y ).orient( 'left' ),
        
        xAxisGroup,
        yAxisGroup,
        
        // animation stuff,
        duration = 3000;
    
    xAxisGroup = svg.append( 'g' )
                    .attr( 'class', 'x axis' )
                    .attr( 'transform', 'translate( 0,' + ( height - margin.bottom ) + ')' )
                    .transition()
                    .call( xAxis );
    
    // filter stuff
    /* For the drop shadow filter... */
    var defs = svg.append( 'defs' );

    var filter = defs.append( 'filter' )
                      .attr( 'id', 'dropshadowArea' )

    filter.append( 'feGaussianBlur' )
          .attr( 'in', 'SourceAlpha' )
          .attr( 'stdDeviation', 3 )
          .attr( 'result', 'blur' );
    filter.append( 'feOffset' )
          .attr( 'in', 'blur' )
          .attr( 'dx', 2 )
          .attr( 'dy', 2 )
          .attr( 'result', 'offsetBlur' );

    var feMerge = filter.append( 'feMerge' );

    feMerge.append( 'feMergeNode' )
            .attr( 'in", "offsetBlur' )
    feMerge.append( 'feMergeNode' )
            .attr( 'in', 'SourceGraphic' );
    // end filter stuff
    
    drawArea(
      svg,
      data.filter(
        function( datum ) { return datum.type === 'Music'; }
      ),
      'red',
      1
    );
    
    drawArea(
      svg,
      data.filter(
        function( datum ) { return datum.type === 'Photos'; }
      ),
      'purple',
      2
    );
    
    drawArea(
      svg,
      data.filter(
        function( datum ) { return datum.type === 'Files'; }
      ),
      'cyan',
      3
    );
    
    function drawArea( svg, data, className, index ) {
      var area = d3.svg.area()
                        .x( function( d ) { return x( d.date ) + x.rangeBand() / 2 ; } )
                        .y0( height - margin.bottom * 1.5 )
                        .y1( function( d ) { return y( d.value ); } )
                        .interpolate( 'cardinal' ),
          startData = [];
      
      // if you know a better way please tell me. ;)
      // js deep "copy"
      data.forEach( function( datum ) {
        startData.push( { date : datum.date, value : 0 } );
      } );
      
      svg.append( 'path' )
          .datum( startData )
          .attr( 'class', 'ui__timeline__area ' + className )
          .attr( 'd', area )
          .attr( 'filter', 'url(#dropshadowArea)' )
          .transition()
          .delay( 1000 * index )   
          .duration( duration )
          .attrTween( 'd', tweenArea( data ) );
      
      
      // Helper functions!!!
      function tweenArea( b ) {
        return function( a ) {
          var i = d3.interpolateArray( a, b );          
          a.forEach( function( datum, index ) {
            a[ index ] = b[ index ]
          } );

          return function( t ) {
            return area( i ( t ) );
          };
        };
      }
    }
  }
  
  function ಠ_ಠ() {
    visualizeDownloadCircles( '.ui__downloadList__item' );
    visualizeDownloadTimeline( '.ui__timeline', data );
  }
  
  // yeah, let's kick things off!!!
  ಠ_ಠ();
} )( d3 );
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


$(".icon-bookmark").click(function() {
  $("#placemark").addClass("placemarked");
  $(".icon-bookmark").addClass("pressed");
});
    
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
