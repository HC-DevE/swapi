import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFilmDto, UpdateFilmDto } from 'src/films/dto/create-film.dto';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async findAll() {
    return this.filmRepository.find();
  }

  // async findOne(id: number) {
  //     return await this.filmRepository.findOne(id);
  // }

  async findOneById(filmId: number) {
    return await this.filmRepository.findOne(filmId);
  }

  //findAllByStarship
  async findAllByStarship(id: number) {
    return await this.filmRepository.find({
      where: { starships: { id } },
    });
  }

  //find all by ids
  async findAllByIds(ids: number[]) {
    return await this.filmRepository.findByIds(ids);
  }

  //create one
  async create(createSratshipDto: CreateFilmDto) {
    const createdFilm = await this.filmRepository.create(createSratshipDto);
    const saveFilm = await this.filmRepository.save(createdFilm);
    return saveFilm;
  }

  //update one
  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const updateFilm = await this.filmRepository.update(id, updateFilmDto);
    return updateFilm;
  }

  //delete one
  async delete(id: number) {
    const deleteFilm = await this.filmRepository.delete(id);
    return deleteFilm;
  }
}
