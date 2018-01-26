exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('palettes').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          project: "Foo Project"
        }, 'id')
          .then(project => {
            return knex('palettes').insert([
              { palette: "first", hex1: '#2f2fcf', hex2: '#2f2fcf', hex3: '#2f2fcf', hex4: '#2f2fcf', hex5: '#2f2fcf', project_id: project[0] },
              { palette: "second", hex1: '#2f2fcf', hex2: '#2f2fcf', hex3: '#2f2fcf', hex4: '#2f2fcf', hex5: '#2f2fcf', project_id: project[0] },
              { palette: "third", hex1: '#2f2fcf', hex2: '#2f2fcf', hex3: '#2f2fcf', hex4: '#2f2fcf', hex5: '#2f2fcf', project_id: project[0] },
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
