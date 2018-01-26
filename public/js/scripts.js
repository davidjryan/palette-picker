$(document).ready(() => {
  getColors();
  console.log("you're in")
});

// generate random colors
const randomColor = () => {
  return '#' + (Math.random() * (1 << 24) | 0).toString(16);
}

// assign colors to DOM

const getColors = () => {
  $('.color').each( function() {
    if (!$(this).hasClass('locked')) {
      const newColor = randomColor()
      $(this).css('background-color', newColor)
      $(this).find('.hex').text(newColor) 
    };
  });
}

document.body.onkeyup = function(e) {
  console.log(e.keyCode)
  if (e.keyCode === 32) {
    getColors();
  }
};

// dropdown
$(function () {

  $("ul.dropdown li").hover(function () {

    $(this).addClass("hover");
    $('ul:first', this).css('visibility', 'visible');

  }, function () {

    $(this).removeClass("hover");
    $('ul:first', this).css('visibility', 'hidden');

  });

  $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");

});

$('.lock').on('click', (event) => {
  $(event.target).parents('.color').toggleClass('locked');
  $(event.target).toggleClass('closed');
})

 