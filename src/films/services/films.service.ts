import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFilmDto, UpdateFilmDto } from 'src/films/dto/create-film.dto';
import { Film } from 'src/films/entities/film.entity';
import { PeopleService } from 'src/people/services/people.service';
import { PlanetsService } from 'src/planets/services/planets.service';
import { SpeciesService } from 'src/species/services/species.services';
import { StarshipsService } from 'src/starships/services/starships.service';
import { VehiclesService } from 'src/vehicules/services/vehicules.service';
import { Repository } from 'typeorm';
import * as filmsData from '../../../Json/films.json';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @Inject(forwardRef(() => PeopleService))
    private peopleService: PeopleService,
    @Inject(forwardRef(() => PlanetsService))
    private planetsService: PlanetsService,
    @Inject(forwardRef(() => SpeciesService))
    private speciesService: SpeciesService,
    @Inject(forwardRef(() => StarshipsService))
    private starshipsService: StarshipsService,
    @Inject(forwardRef(() => VehiclesService))
    private vehiclesService: VehiclesService,
  ) {}

  async findAll() {
    return this.filmRepository.find({
      relations: ['characters', 'planets', 'species', 'starships', 'vehicles'],
    });
  }

  // async findOne(id: number) {
  //     return await this.filmRepository.findOne(id);
  // }

  async findOneById(filmId: number) {
    return await this.filmRepository.findOne(filmId, {
      relations: ['characters', 'planets', 'species', 'starships', 'vehicles'],
    });
  }

  //findAllByStarship
  async findAllByStarship(id: number) {
    return await this.filmRepository.find({
      where: { starships: { id } },
      relations: ['characters', 'planets', 'species', 'starships', 'vehicles'],
    });
  }

  //find all by ids
  async findAllByIds(ids: number[]) {
    return await this.filmRepository.findByIds(ids);
  }

  //create one
  async create(createFilmDto: CreateFilmDto) {
    const existingFilm = await this.filmRepository.findOne({
      where: { title: createFilmDto.title },
    });

    if (existingFilm)
      throw new BadRequestException('Film with this title already exists');

    const film = new Film();
    Object.assign(film, createFilmDto);

    //characters
    if (createFilmDto.characters) {
      film.characters = await this.peopleService.findAllByIds(
        createFilmDto.characters,
      );
    }

    //planets
    if (film.planets?.length && createFilmDto.planets) {
      film.planets = await this.planetsService.findAllByIds(
        createFilmDto.planets,
      );
    }

    //species
    if (film.species?.length && createFilmDto.species) {
      film.species = await this.speciesService.findAllByIds(
        createFilmDto.species,
      );
    }

    //starships
    if (film.starships?.length && createFilmDto.starships) {
      film.starships = await this.starshipsService.findAllByIds(
        createFilmDto.starships,
      );
    }

    //vehicles
    if (film.vehicles?.length && createFilmDto.vehicles) {
      film.vehicles = await this.vehiclesService.findAllByIds(
        createFilmDto.vehicles,
      );
    }

    const newFilm = await this.filmRepository.save(film);
    return newFilm;
  }

  //update one
  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.findOne(id, {
      relations: ['characters', 'planets', 'species', 'starships', 'vehicles'],
    });

    if (!film) throw new BadRequestException('Film not found');

    //characters
    const characters = [];
    if (updateFilmDto.characters) {
      film.characters = await this.peopleService.findAllByIds(
        updateFilmDto.characters,
      );
    }

    //planets
    let planets = [];
    if (film.planets?.length && updateFilmDto.planets) {
      planets = await this.planetsService.findAllByIds(updateFilmDto.planets);
    }

    //species
    let species = [];
    if (film.species?.length && updateFilmDto.species) {
      species = await this.speciesService.findAllByIds(updateFilmDto.species);
    }

    //starships
    let starships = [];
    if (film.starships?.length && updateFilmDto.starships) {
      starships = await this.starshipsService.findAllByIds(
        updateFilmDto.starships,
      );
    }

    //vehicles
    let vehicles = [];
    if (film.vehicles?.length && updateFilmDto.vehicles) {
      vehicles = await this.vehiclesService.findAllByIds(
        updateFilmDto.vehicles,
      );
    }

    const updatedFilm = await this.filmRepository.preload({
      id,
      ...updateFilmDto,
      characters,
      planets,
      species,
      starships,
      vehicles,
    });

    return await this.filmRepository.save(updatedFilm);
  }

  //delete one
  async delete(id: number) {
    const deleteFilm = await this.filmRepository.delete(id);
    return deleteFilm;
  }

  async seedAll() {
    filmsData.forEach(async (item) => {
      const createFilmDto = {
        ...item.fields,
        opening_crawl: item.fields.opening_crawl.substring(0, 100),
        episod_id: item.fields.episode_id.toString(),
        createdAt: new Date(item.fields.created),
        updatedAt: new Date(item.fields.created),
        id: item.pk,
      };

      const peopleExist = await this.filmRepository.findOne(item.pk);

      if (!peopleExist) {
        await this.create(createFilmDto);
        //console.log("not founded", item.pk)
      } else {
        await this.update(item.pk, createFilmDto);
        //console.log("founded", item.pk)
      }
    });
  }
}
