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
  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    // const starship = this.starshipRepository.create(
    //   {
    //     ...createStarshipDto,
    //     films: await this.filmService.findAllByIds(createStarshipDto.films),
    //     pilots: await this.peopleService.findAllByIds(createStarshipDto.pilots),
    //   }
    // );
    // return this.starshipRepository.save(starship);

    const starship = new Starship();

    // Résolution et assignation de la relation films
    if (createStarshipDto.films && createStarshipDto.films.length > 0) {
      starship.films = await this.filmService.findAllByIds(
        createStarshipDto.films,
      );
    }

    // Résolution et assignation de la relation pilots
    if (createStarshipDto.pilots && createStarshipDto.pilots.length > 0) {
      starship.pilots = await this.peopleService.findAllByIds(
        createStarshipDto.pilots,
      );
    }

    // Assignation des autres propriétés
    starship.name = createStarshipDto.name;
    starship.model = createStarshipDto.model;
    starship.starship_class = createStarshipDto.starship_class;
    starship.manufacturer = createStarshipDto.manufacturer;
    starship.cost_in_credits = createStarshipDto.cost_in_credits;
    starship.length = createStarshipDto.length;

    await this.starshipRepository.save(starship);
    return starship;
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
