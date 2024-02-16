import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import {
  CreateStarshipDto,
  UpdateStarshipDto,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    private filmService: FilmsService,
    private peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.starshipRepository.find();
  }

  // async findOne(property: any) {
  //   return await this.starshipRepository.findOne(property);
  // }

  async findOneById(starshipId: number) {
    return await this.starshipRepository.findOne(starshipId);
  }

  //findAll by ids
  async findAllByIds(ids: number[]) {
    return await this.starshipRepository.findByIds(ids);
  }

  //create one
  async create(createSratshipDto: CreateStarshipDto) {
    let films = [];
    if (createSratshipDto.films) {
      films = await this.filmService.findAllByIds(createSratshipDto.films);
    }
    let pilots = [];
    if (createSratshipDto.pilots) {
      pilots = await this.peopleService.findAllByIds(createSratshipDto.pilots);
    }

    const newStarship = this.starshipRepository.create({
      ...createSratshipDto,
      films,
      pilots,
    });

    return await this.starshipRepository.save(newStarship);
  }

  //update one
  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const starship = await this.starshipRepository.findOne(id);

    let films = [];
    if (updateStarshipDto.films) {
      films = await this.filmService.findAllByIds(updateStarshipDto.films);
    }

    let pilots = [];
    if (updateStarshipDto.pilots) {
      pilots = await this.peopleService.findAllByIds(updateStarshipDto.pilots);
    }

    return this.starshipRepository.save(
      this.starshipRepository.merge(starship, {
        ...updateStarshipDto,
        films,
        pilots,
      }),
    );
  }

  //delete one
  async delete(id: number) {
    const deleteStarship = await this.starshipRepository.delete(id);
    return deleteStarship;
  }
}
