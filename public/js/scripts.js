$(document).ready(() => {
  getColors();
  fetchProjects();
  fetchPalettes();
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


// fetch projects
const fetchProjects = async () => {
  const projectsFetch = await fetch('http://localhost:3000/api/v1/projects/')
  const projectsData = await projectsFetch.json()
  console.log(projectsData)

  return appendProjects(projectsData);
}

const appendProjects = (projects) => {
  projects.forEach((project, index) => {
    // make conditional -- if project.id exists don't append
    $('ul.sub_menu').append(`<li class="project-${project.id}"><a href="#">${project.project}</a><ul class="palette-list-${project.id}"></ul></li>`)
  })
}

const fetchPalettes = async () => {
  const palettesFetch = await fetch('http://localhost:3000/api/v1/palettes/')
  const palettesData = await palettesFetch.json();
  console.log(palettesData)

  return appendPalettes(palettesData);
}

const appendPalettes = (palettes) => {
  palettes.forEach((palette, index) => {
    console.log(palette)
    // make conditional -- if project.id exists don't append
    $(`li.project-${palette.project_id}`).append(`<li class="palette-${palette.id}"><a href="#">${palette.palette}</a></li>`)
  })
}

document.body.onkeyup = function (e) {
  console.log(e.keyCode)
  if (e.keyCode === 32) {
    getColors();
  }
};

$('.lock').on('click', (event) => {
  $(event.target).parents('.color').toggleClass('locked');
  $(event.target).toggleClass('closed');
})

 