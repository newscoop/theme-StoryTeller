var winHeight = $(window).height();
var winWidth = $(window).width();

$(document).ready(function(){
  // scope is private but can use global

  $('section').each(function(){
    if ($(this).attr('class')){
      var paddingTop = ($(this).css('padding-top'));
      paddingTop = paddingTop.replace('px','');
      var paddingBottom = ($(this).css('padding-bottom'));
      paddingBottom = paddingBottom.replace('px','');
      var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
      $(this).css({
        'min-height': (winHeight - paddingVertical) + 'px'
      });
    }
  });

  // use this function to create IDs for objects that don't have them
  var randId = function(limit){
    var randVal = ""; // we want a string the length of the input limit not an integer
    if (limit === null || limit === undefined){
      limit = 4; // you can't have a random string of nothing so set default to 4 where there are 10000 (including 0000) possibilities
    }
    for (i = 0; i < limit; i = i + 1){
      var randValPart = Math.floor(Math.random(0, limit) * 10);
      randVal = randVal + randValPart;
    }
    return randVal;
  };

  $('section.video').each(function(){
    var video = $(this).find('video');
    var videoArr = new Array([]);
    videoArr.id = randId();
    videoArr.mp4 = "";
    videoArr.ogg = "";
    videoArr.webm = "";
    var j = video.find('source').length;
    for (i = 0; i < j; i = i + 1){
      tmpStr = $(this).find('source')[i].src;
      if (tmpStr.indexOf('mp4')!=-1){
        videoArr.mp4 = tmpStr;
      }
      if (tmpStr.indexOf('ogv')!=-1){
        videoArr.ogg = tmpStr;
      }
      if (tmpStr.indexOf('webm')!=-1){
        videoArr.webm = tmpStr;
      }
    }
    var canvasObj = '<canvas id=' + videoArr.id + '>Your browser doesn\'t support the canvas element. Please upgrade to a newer browser.</canvas>';
    video.before(canvasObj);
    video.hide();
    // now push the video to the canvas
    var v = video[0];
    var canvas = $('#' + videoArr.id)[0];
    var context = canvas.getContext('2d');

    var cw = Math.floor(canvas.clientWidth);
    var ch = Math.floor(canvas.clientHeight);
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context,cw,ch);
    },false);

    function draw(v,c,w,h) {
        if(v.paused || v.ended) return false;
        c.drawImage(v,0,0,w,h);
        setTimeout(draw,20,v,c,w,h);
    }
  });

  $('.slides').bxSlider();

  // full sreen maps
  $('section.map.full').each(function(){
    var map = $(this).find('iframe');
    map.attr('width', winWidth);
    map.attr('height', winHeight);
  });

  // main loop triggers every half a second
  var loop = setInterval(function(){
    // this is always the current top left corner of the viewing area
    var currViewport = window.pageYOffset;
    // you can get the viewport area by adding winHeight to currViewport
    $('.full').each(function(){
      var fullTop = $(this).position().top;
      var fullBot = $(this).height();
      var fullSize = fullTop + fullBot;
      // then we want to remove the windowHeight form the top position and add it to the height so that when we check to see if elements should be displayed or not we make sure they don't just appear
      var fullTopAdj = (fullTop - winHeight);
      var fullBotAdj = (fullBot + winHeight);
      var fullSizeAdj = fullTopAdj + fullBotAdj;
      if (((currViewport + (winHeight + (winHeight / 2))) >= fullTop) && (currViewport <= (fullSize + (winHeight / 2)))){
        $(this).find('figure, iframe, video').css({
          'display': 'block'
        });
      } else {
        $(this).find('figure, iframe, video').css({
          'display': 'none'
        });
      }
    });

  }, 250);

});
