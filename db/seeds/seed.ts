// // src/seeds/seed.ts
// import { NestFactory } from '@nestjs/core';
// import { getConnection } from 'typeorm';
// import * as fs from 'fs';
// import { Planet } from 'src/planets/entities/planet.entity';
// import { AppModule } from 'src/app.module';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const connection = getConnection();
//   const planetRepository = connection.getRepository(Planet);

//   // Exemple pour les planètes
//   const planetsData = JSON.parse(fs.readFileSync('../../Json/planets.json', 'utf8'));

//   for (const planetData of planetsData) {
//     const planet = new Planet();
//     planet.id = planetData.pk;
//     planet.name = planetData.fields.name;
//     planet.name = planetData.fields.fields.name;
//     planet.diameter = planetData.fields.diameter;
//     planet.rotation_period = planetData.fields.rotation_period;
//     planet.orbital_period = planetData.fields.orbital_period;
//     planet.gravity = planetData.fields.gravity;
//     planet.population = planetData.fields.population;
//     planet.climate = planetData.fields.climate;
//     planet.terrain = planetData.fields.terrain;
//     planet.surface_water = planetData.fields.surface_water;

//     await planetRepository.save(planet);
//   }

//   // Répétez le processus pour les autres entités (films, people, etc.)

//   await app.close();
// }

// bootstrap().catch((err) => {
//   console.error('Seeding failed', err);
//   process.exit(1);
// });
