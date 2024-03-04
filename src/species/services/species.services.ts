import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    @InjectRepository(Specie)
    private specieRepository: Repository<Specie>,
    private planetService: PlanetsService,
    private filmService: FilmsService,
    private peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.specieRepository.find();
  }

  /*async findOne(id: number) {
    return await this.specieRepository.findOne(id);
  }*/

  async findOneById(specieId: number) {
    return await this.specieRepository.findOneOrFail(specieId);
  }

  async findByName(name: string) {
    return await this.specieRepository.findOneOrFail({
      where: { name },
    });
  }

  async create(createSpecieDto: CreateSpecieDto) {
    const specie = await this.specieRepository.findOne({
      name: createSpecieDto.name,
    });

    if (specie) {
      throw new BadRequestException(
        `Specie with name ${createSpecieDto.name} already exists`,
      );
    }

    const homeworld = await this.planetService.findOneById(
      createSpecieDto.homeworld,
    );
    const people = await this.peopleService.findAllByIds(
      createSpecieDto.people,
    );
    const films = await this.filmService.findAllByIds(createSpecieDto.films);

    const createdSpecie = this.specieRepository.create({
      ...createSpecieDto,
      homeworld,
      people,
      films,
    });

    const saveSpecie = await this.specieRepository.save(createdSpecie);
    return saveSpecie;
  }

  async update(id: number, updateSpecieDto: UpdateSpecieDto) {
    const specie = await this.specieRepository.findOne(id);

    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }

    const homeworld = await this.planetService.findOneById(
      updateSpecieDto.homeworld,
    );
    const people = await this.peopleService.findAllByIds(
      updateSpecieDto.people,
    );
    const films = await this.filmService.findAllByIds(updateSpecieDto.films);

    const updatedSpecie = await this.specieRepository.update(id, {
      ...updateSpecieDto,
      homeworld,
      people,
      films,
    });

    return updatedSpecie;
  }

  async delete(id: number) {
    const specie = await this.specieRepository.findOne(id);

    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }

    return this.specieRepository.remove(specie);
  }
}
