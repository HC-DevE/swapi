import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsService } from 'src/films/services/films.service';
import {
  CreatePeopleDto,
  UpdatePeopleDto,
} from 'src/people/dto/create-people.dto';
import { People } from 'src/people/entities/people.entity';
import { PlanetsService } from 'src/planets/services/planets.service';
import { SpeciesService } from 'src/species/services/species.services';
import { StarshipsService } from 'src/starships/services/starships.service';
import { VehiclesService } from 'src/vehicules/services/vehicules.service';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
    @Inject(forwardRef(() => FilmsService))
    private readonly filmsService: FilmsService,
    @Inject(forwardRef(() => FilmsService))
    private readonly speciesService: SpeciesService,
    @Inject(forwardRef(() => VehiclesService))
    private readonly vehiclesService: VehiclesService,
    @Inject(forwardRef(() => PlanetsService))
    private readonly planetsService: PlanetsService,
    @Inject(forwardRef(() => StarshipsService))
    private readonly starshipsService: StarshipsService,
  ) {}

  async findAll() {
    return this.peopleRepository.find({
      relations: ['films', 'species', 'vehicles', 'homeworld'],
    });
  }

  //find all by ids
  async findAllByIds(ids: number[]) {
    return await this.peopleRepository.findByIds(ids, {
      relations: ['films', 'species', 'vehicles', 'homeworld'],
    });
  }

  // async findOne(id: number) {
  //     return await this.peopleRepository.findOne(id);
  // }

  async findOneById(peopleId: number) {
    return await this.peopleRepository.findOne(peopleId, {
      relations: ['films', 'species', 'vehicles', 'homeworld'],
    });
  }

  //create one
  async create(createPeopleDto: CreatePeopleDto) {
    const existingPerson = await this.peopleRepository.findOne({
      where: { name: createPeopleDto.name },
    });

    if (existingPerson)
      throw new BadRequestException('People with this name already exists');

    const people = new People();

    Object.assign(people, createPeopleDto);

    // Résolution et assignation de la relation films
    if (createPeopleDto.films && createPeopleDto.films.length > 0) {
      people.films = await this.filmsService.findAllByIds(
        createPeopleDto.films,
      );
    }

    // Résolution et assignation de la relation species
    if (createPeopleDto.species && createPeopleDto.species.length > 0) {
      people.species = await this.speciesService.findAllByIds(
        createPeopleDto.species,
      );
    }

    // Résolution et assignation de la relation vehicles
    if (createPeopleDto.vehicles && createPeopleDto.vehicles.length > 0) {
      people.vehicles = await this.vehiclesService.findAllByIds(
        createPeopleDto.vehicles,
      );
    }

    // Résolution et assignation de la relation planets
    if (createPeopleDto.homeworld) {
      people.homeworld = await this.planetsService.findOneById(
        createPeopleDto.homeworld,
      );
    }

    // Résolution et assignation de la relation starships
    if (createPeopleDto.starships && createPeopleDto.starships.length > 0) {
      people.starships = await this.starshipsService.findAllByIds(
        createPeopleDto.starships,
      );
    }

    await this.peopleRepository.save(people);
    return people;
  }

  //update one
  async update(id: number, updatePeopleDto: UpdatePeopleDto) {
    const people = await this.peopleRepository.findOne(id, {
      relations: ['films', 'species', 'vehicles', 'homeworld'],
    });

    if (!people) throw new BadRequestException('People not found');

    let films = [];
    if (updatePeopleDto.films) {
      films = await this.filmsService.findAllByIds(updatePeopleDto.films);
    }

    let species = [];
    if (updatePeopleDto.species) {
      species = await this.speciesService.findAllByIds(updatePeopleDto.species);
    }

    let vehicles = [];
    if (updatePeopleDto.vehicles) {
      vehicles = await this.vehiclesService.findAllByIds(
        updatePeopleDto.vehicles,
      );
    }

    let planet = null;
    if (updatePeopleDto.homeworld) {
      planet = await this.planetsService.findOneById(updatePeopleDto.homeworld);
    }

    let starships = [];
    if (updatePeopleDto.starships) {
      starships = await this.starshipsService.findAllByIds(
        updatePeopleDto.starships,
      );
    }

    return this.peopleRepository.update(
      { id },
      {
        ...updatePeopleDto,
        films,
        species,
        vehicles,
        starships,
        homeworld: planet,
      },
    );
  }

  //delete one
  async delete(id: number) {
    const deletePeople = await this.peopleRepository.delete(id);
    return deletePeople;
  }
}
