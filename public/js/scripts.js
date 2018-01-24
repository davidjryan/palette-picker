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
  // get sections

  // iterate over each and color and hex value
  
}

// toggle classes

 