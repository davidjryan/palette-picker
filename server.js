const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Palette Picker'
app.locals.projects = [
  { project: 'sweet', palette: [ '#FE5fsd', '#FED354', '#FEG345', '#FHG678', '#FTY856']}
]

app.get('/', (request, response) => {
  response.send('what up color boy')
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})