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
  async create(createSratshipDto: CreateFilmDto) {
    const film = new Film();
    Object.assign(film, createSratshipDto);
    return await this.filmRepository.save(film);
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
}
