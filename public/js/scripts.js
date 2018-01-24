$(window).keypress((event) => {
  if (event.which === 32) {
    getColors();
  }
});



$(document).ready(() => {
  getColors();
});

// generate random colors
const randomColor = () => {
  return '#' + (Math.random() * (1 << 24) | 0).toString(16);
}

// assign colors to DOM

const getColors = () => {
  $(section).each( () => {
    if (!$(this).hasClass('locked')) {
      const newColor = randomColor()
      $(this).css("background-color", newColor)
      $(this).find('.hex').text(newColor) 
    };
  });
}

// toggle classes

 