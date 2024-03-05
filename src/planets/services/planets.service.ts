import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import {
  CreatePlanetDto,
  UpdatePlanetDto,
} from 'src/planets/dto/create-planet.dto';
import { Planet } from 'src/planets/entities/planet.entity';
import { Repository } from 'typeorm';
// import * as fs from 'fs';
import * as planetsData from '../../../Json/planets.json';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @Inject(forwardRef(() => PeopleService))
    private readonly peopleService: PeopleService,
    @Inject(forwardRef(() => FilmsService))
    private readonly filmService: FilmsService,
  ) {}

  async findAll() {
    return this.planetRepository.find({
      relations: ['films', 'residents'],
    });
  }

  // async findOne(id: number) {
  //     return await this.planetRepository.findOne(id);
  // }

  async findOneById(planetId: number) {
    return await this.planetRepository.findOne(planetId, {
      relations: ['films', 'residents'],
    });
  }

  //findAll by ids
  async findAllByIds(ids: number[]) {
    return await this.planetRepository.findByIds(ids, {
      relations: ['films', 'residents'],
    });
  }

  //create one
  async create(createPlanetDto: CreatePlanetDto) {
    const existingPlanet = await this.planetRepository.findOne({
      where: { name: createPlanetDto.name },
    });
    if (existingPlanet) {
      throw new BadRequestException('Planet with this name already exists');
    }

    const planet = new Planet();

    Object.assign(planet, createPlanetDto);

    if (createPlanetDto.films && createPlanetDto.films.length > 0) {
      planet.films = await this.filmService.findAllByIds(createPlanetDto.films);
    }

    if (createPlanetDto.residents && createPlanetDto.residents.length > 0) {
      planet.residents = await this.peopleService.findAllByIds(
        createPlanetDto.residents,
      );
    }

    await this.planetRepository.save(planet);
    return planet;
  }

  //update one
  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet = await this.planetRepository.findOne(id, {
      relations: ['films', 'residents'],
    });

    if (!planet) {
      throw new NotFoundException('Planet not found');
    }

    let films = [];
    if (updatePlanetDto.films) {
      films = await this.filmService.findAllByIds(updatePlanetDto.films);
    }

    let residents = [];
    if (updatePlanetDto.residents) {
      residents = await this.peopleService.findAllByIds(
        updatePlanetDto.residents,
      );
    }

    console.log(updatePlanetDto, planet);
    return this.planetRepository.save(
      this.planetRepository.merge(planet, {
        ...updatePlanetDto,
        films,
        residents,
      }),
    );
  }

  //delete one
  async delete(id: number) {
    const planet = await this.planetRepository.findOne(id);

    if (!planet) {
      throw new NotFoundException(`Planet with id ${id} does not exist`);
    }

    await this.planetRepository.remove(planet);

    return { message: 'Planet supprimée' };
  }

  // seeds planet
  async seedAll() {
    /*console.log(
      'Insertion des données des planètes avec les fields:',
      planetsData,
    );*/

    planetsData.forEach(async (item) => {
      //console.log(item.fields);
      const planet = new Planet();

      planet.name = item.fields.name;
      planet.name = item.fields.name;
      planet.diameter = item.fields.diameter;
      planet.rotation_period = item.fields.rotation_period;
      planet.orbital_period = item.fields.orbital_period;
      planet.gravity = item.fields.gravity;
      planet.population = item.fields.population;
      planet.climate = item.fields.climate;
      planet.terrain = item.fields.terrain;
      planet.surface_water = item.fields.surface_water;
      planet.createdAt = new Date(item.fields.created);
      planet.updatedAt = new Date(item.fields.edited);
      planet.id = item.pk;

      const planetExist = await this.planetRepository.findOne(+item.pk);
      if (!planetExist) {
        await this.planetRepository.save(planet);
        //console.log("not", item.pk)
      } else {
        await this.planetRepository.update({ id: +item.pk }, planet);
        //console.log("yes", item.pk)
      }
    });
  }
}
