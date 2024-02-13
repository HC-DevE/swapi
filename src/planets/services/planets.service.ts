import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import {
  CreatePlanetDto,
  UpdatePlanetDto,
} from 'src/planets/dto/create-planet.dto';
import { Planet } from 'src/planets/entities/planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
  ) {}

  async findAll() {
    const planets = await this.planetRepository.find();
    console.log({ planets });

    if (!planets) {
      return new NotFoundError(`Aucune planet n'a été trouvé`);
    }

    return planets;
  }

  // async findOne(id: number) {
  //     return await this.planetRepository.findOne(id);
  // }

  async findOneById(planetId: number) {
    return await this.planetRepository.findOne(planetId);
  }

  //create one
  async create(createPlanetDto: CreatePlanetDto) {
    const createdPlanet = await this.planetRepository.create(createPlanetDto);
    const savePlanet = await this.planetRepository.save(createdPlanet);
    return savePlanet;
  }

  //update one
  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const updatePlanet = await this.planetRepository.update(
      id,
      updatePlanetDto,
    );
    return updatePlanet;
  }

  //delete one
  async delete(id: number) {
    const deletePlanet = await this.planetRepository.delete(id);
    return deletePlanet;
  }
}
