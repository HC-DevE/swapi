// import {
//   // createConnection,
//   getRepository,
// } from 'typeorm';
// import * as fs from 'fs';
// import { Planet } from 'src/planets/entities/planet.entity';

// async function seedPlanets() {
//   // const connection = await createConnection(); // Assurez-vous de configurer vos options de connexion
//   const planetRepository = getRepository(Planet);
//   const planetsData = JSON.parse(
//     fs.readFileSync('../../Json/planets.json', 'utf-8'),
//   );

//   console.log(
//     'Insertion des données des planètes avec les fields:',
//     planetsData.fields,
//   );

//   for (const item of planetsData) {
//     const planet = new Planet();
//     planet.name = item.name;
//     planet.diameter = item.diameter;
//     planet.rotation_period = item.rotation_period;
//     planet.orbital_period = item.orbital_period;
//     planet.gravity = item.gravity;
//     planet.population = item.population;
//     planet.climate = item.climate;
//     planet.terrain = item.terrain;
//     planet.surface_water = item.surface_water;

//     await planetRepository.save(planet);
//   }

//   console.log('Les données des planètes ont été insérées avec succès.');
// }

// seedPlanets().catch((error) => console.error(error));
