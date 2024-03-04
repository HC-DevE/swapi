// import { createConnection, getRepository } from 'typeorm';
// import fs from 'fs';
// import path from 'path';
// import { Planet } from 'src/planets/entities/planet.entity';
// // import { Film } from 'src/films/entities/film.entity';
// // import { People } from 'src/people/entities/people.entity';
// // import { Starship } from 'src/starships/entities/starship.entity';
// // import { Vehicle } from 'src/vehicules/entities/vehicule.entity';
// // import { Specie } from 'src/species/entities/species.entity';

// const entitiesOrder = [
//   'Planets',
//   // 'People',
//   // 'Species',
//   // 'Vehicles',
//   // 'Starships',
//   // 'Films',
// ];
// const entitiesMap = {
//   Planets: Planet,
//   //   People: People,
//   //   Species: Specie,
//   //   Vehicles: Vehicle,
//   //   Starships: Starship,
//   //   Films: Film,
// };

// async function seedDatabase() {
//   const connection = await createConnection();

//   console.log('after connetion');

//   for (const entityName of entitiesOrder) {
//     const repository = getRepository(entitiesMap[entityName]);
//     const data = JSON.parse(
//       fs.readFileSync(
//         path.join(__dirname, `./data/${entityName.toLowerCase()}.json`),
//         'utf-8',
//       ),
//     );

//     await repository.save(data);
//   }

//   await connection.close();
// }

// seedDatabase().catch(console.error);
