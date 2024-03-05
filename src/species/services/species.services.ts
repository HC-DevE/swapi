import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specie } from '../entities/species.entity';
import { CreateSpecieDto, UpdateSpecieDto } from '../dto/create-specie.dto';
import { PlanetsService } from 'src/planets/services/planets.service';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie) private specieRepository: Repository<Specie>,
    @Inject(forwardRef(() => PlanetsService))
    private readonly planetService: PlanetsService,
    @Inject(forwardRef(() => FilmsService))
    private readonly filmService: FilmsService,
    @Inject(forwardRef(() => PeopleService))
    private readonly peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.specieRepository.find({
      relations: ['homeworld', 'films', 'people'],
    });
  }

  /*async findOne(id: number) {
    return await this.specieRepository.findOne(id);
  }*/

  async findOneById(specieId: number) {
    return await this.specieRepository.findOne(specieId, {
      relations: ['homeworld', 'films', 'people'],
    });
  }

  //findAll by ids
  async findAllByIds(ids: number[]) {
    return await this.specieRepository.findByIds(ids, {
      relations: ['homeworld', 'films', 'people'],
    });
  }

  /*async findByName(name: string) {
    return await this.specieRepository.findOneOrFail({
      where: { name },
    });
  }*/

  async create(createSpecieDto: CreateSpecieDto) {
    const existingSpecie = await this.specieRepository.findOne({
      where: { name: createSpecieDto.name },
    });

    if (existingSpecie) {
      throw new BadRequestException(
        `Specie with name ${createSpecieDto.name} already exists`,
      );
    }

    const specie = new Specie();

    Object.assign(specie, createSpecieDto);

    if (createSpecieDto.films && createSpecieDto.films.length > 0) {
      specie.films = await this.filmService.findAllByIds(createSpecieDto.films);
    }

    if (createSpecieDto.people && createSpecieDto.people.length > 0) {
      specie.people = await this.peopleService.findAllByIds(
        createSpecieDto.people,
      );
    }

    if (!!createSpecieDto.homeworld) {
      specie.homeworld = await this.planetService.findOneById(
        +createSpecieDto.homeworld,
      );
    }

    await this.specieRepository.save(specie);

    return specie;
  }

  async update(id: number, updateSpecieDto: UpdateSpecieDto) {
    const specie = await this.specieRepository.findOne(id, {
      relations: ['homeworld', 'films', 'people'],
    });

    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }

    let films = [];
    if (updateSpecieDto.films) {
      films = await this.filmService.findAllByIds(updateSpecieDto.films);
    }

    let people = [];
    if (updateSpecieDto.people) {
      people = await this.peopleService.findAllByIds(updateSpecieDto.people);
    }

    const homeworld = await this.planetService.findOneById(
      +updateSpecieDto.homeworld,
    );

    return this.specieRepository.save(
      this.specieRepository.merge(specie, {
        ...updateSpecieDto,
        homeworld,
        films,
        people,
      }),
    );
  }

  async delete(id: number) {
    const specie = await this.specieRepository.findOne(id);

    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }

    return this.specieRepository.remove(specie);
  }
}
