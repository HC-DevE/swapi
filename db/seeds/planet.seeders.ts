import { Injectable } from '@nestjs/common';
import donneesJSON from '../../Json/planets.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from 'src/planets/entities/planet.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  async seed() {
    const existingPlanets = await this.planetRepository.find();

    if (existingPlanets.length === 0) {
      donneesJSON.forEach(async (planetData) => {
        const newPlanet = this.planetRepository.create({
          name: planetData.fields.name,
          climate: planetData.fields.climate,
          surface_water: planetData.fields.surface_water,
          diameter: planetData.fields.diameter,
          rotation_period: planetData.fields.rotation_period,
          terrain: planetData.fields.terrain,
          gravity: planetData.fields.gravity,
          orbital_period: planetData.fields.orbital_period,
          population: planetData.fields.population,
        });
        await this.planetRepository.save(newPlanet);
      });
    }
  }
}

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
