$(function(){
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       
       if(Math.abs(lastScrollTop - st) <= delta)
          return;

      space = 0.02;
      size = 15;
       
       if (st > lastScrollTop){
           // downscroll code
           console.log('scroll down');
           increaseLetterSpace(space);
       } else {
          // upscroll code
          console.log('scroll up');
          decreaseLetterSpace(space);
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
