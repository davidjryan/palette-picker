const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// We want to know if we're in development, testing, or production environment.  
// If we don't know, we'll assume we're in development.
const environment = process.env.NODE_ENV || 'development';

// Based on that environment, we'll fetch the database configuration from knexfile.js 
// for whatever environment we're in  and now our express app will be able to connect to it.
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'palette-picker';

const requireHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded=proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.get('/', (request, response) => {
  response.send('what up color boy')
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/palettes/:id", (request, response) => {
  const { id } = request.params;
  
  database("palettes")
    .select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['project']) {
    if(!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { project: <String> }. 
          You're missing a "${requiredParameter}" property.`
        });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  // grab project id
  const { id } = request.params;
  // combine palette object with project id reference
  const palette = Object.assign({}, request.body, {project_id: id})
  // check for missing params
  for (let requiredParams of ['palette', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5']) {
    if (!palette[requiredParams]) {
      return response
        .status(422)
        .json({ error: `You are missing ${requiredParams}` })
    }
  }
  // insert palette
  database('palettes').insert(palette, 'id')
    .then(palette => {
      return response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      return response.status(500).json({ error: 'yay error' })
    })
})

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { project, id } = request.params;

  database('palettes').where('project_id', project).where('id', id).del()
    .then(result => {
      return response.status(204).json({ result });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})