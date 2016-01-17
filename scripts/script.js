var font_weight_step = 10;
var font_weight_counter = font_weight_step;

$(function(){
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       
       if(Math.abs(lastScrollTop - st) <= delta)
          return;

      space = 0.015;
      var lookingAtHuge = hugeScrolledIntoView();
      var lookingAtLetterSpacing = letterSpacingScrolledIntoView();
       
       if (st > lastScrollTop){
           // downscroll code
           if (lookingAtLetterSpacing){
              increaseLetterSpace(space);
           }
           if (lookingAtHuge){
              font_weight_counter += font_weight_step;
              if (font_weight_counter % 100 == 0){
                increaseFontWeight(font_weight_counter);
              }
           }
       } else {
          // upscroll code
          if (lookingAtLetterSpacing){
              decreaseLetterSpace(space);
          }
           if (lookingAtHuge){
              font_weight_counter -= font_weight_step;
              if (font_weight_counter % 100 == 0){
                decreaseFontWeight(font_weight_counter);
              }
           }
       }
       lastScrollTop = st;
    });
});


function getStyle(element, name) {
    // J/S Pro Techniques p136
    if (element.style[name]) {
        return element.style[name];
    } else if (element.currentStyle) {
        return element.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(element, "");
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}


function increaseLetterSpace(space) {
  var element = document.getElementById('letter-spacing'),
  letter_spacing = getStyle(element, 'letter-spacing');

  element.style.letterSpacing = parseFloat(letter_spacing) + space + 'vw';
}


function decreaseLetterSpace(space) {
  var element = document.getElementById('letter-spacing'),
  letter_spacing = getStyle(element, 'letter-spacing');

element.style.letterSpacing = parseFloat(letter_spacing) - space + 'vw';
}




function increaseFontWeight(weight) {
  var element = document.getElementById('font-size-changing'),
  font_weight = getStyle(element, 'font-weight');

  element.style.fontWeight = parseFloat(font_weight) + weight;
}

function decreaseFontWeight(weight) {
  var element = document.getElementById('font-size-changing'),
  font_weight = getStyle(element, 'font-weight');

  element.style.fontWeight = parseFloat(font_weight) - weight;
}

function hugeScrolledIntoView()
{
    var $elem = $('#font-size-changing');
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


function letterSpacingScrolledIntoView()
{
    var $elem = $('#letter-spacing');
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}