import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import {
  CreateStarshipDto,
  UpdateStarshipDto,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { Repository } from 'typeorm';
import * as starshipJsonData from '../../../Json/starships.json';
// import * as transportJsonData from '../../../Json/transport.json';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    private filmService: FilmsService,
    private peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.starshipRepository.find({
      relations: ['films', 'pilots'],
    });
  }

  // async findOne(property: any) {
  //   return await this.starshipRepository.findOne(property);
  // }

  async findOneById(starshipId: number) {
    return await this.starshipRepository.findOne(starshipId, {
      relations: ['films', 'pilots'],
    });
  }

  //findAll by ids
  async findAllByIds(ids: number[]) {
    return await this.starshipRepository.findByIds(ids, {
      relations: ['films', 'pilots'],
    });
  }

  //create one
  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const existingStarship = await this.starshipRepository.findOne({
      where: { name: createStarshipDto.name },
    });

    if (existingStarship)
      throw new BadRequestException('Starship with this name already exists');

    const starship = new Starship();

    Object.assign(starship, createStarshipDto);

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

    await this.starshipRepository.save(starship);
    return starship;
  }

  //update one
  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const starship = await this.starshipRepository.findOne(id, {
      relations: ['films', 'pilots'],
    });

    if (!starship) throw new BadRequestException('Starship not found');

    let films = [];
    if (updateStarshipDto.films) {
      films = await this.filmService.findAllByIds(updateStarshipDto.films);
    }

    let pilots = [];
    if (updateStarshipDto.pilots) {
      pilots = await this.peopleService.findAllByIds(updateStarshipDto.pilots);
    }

    return this.starshipRepository.update(
      { id },
      {
        ...updateStarshipDto,
        films,
        pilots,
      },
    );
  }

  //delete one
  async delete(id: number) {
    const starship = await this.starshipRepository.findOne(id);

    if (!starship)
      throw new NotFoundException(`Starship with id ${id} does not exist`);

    return this.starshipRepository.remove(starship);
  }

  //seed
  async seedAll() {
    // const data = seedStarshipDto;

    const data = starshipJsonData;
    console.log({ ...data[0].fields, id: data[0].pk });

    // // Itérer sur chaque objet starship et l'insérer dans la base de données
    // for (const item of data.fields) {
    //   // console.log('Inserting starship: ', item.name);
    //   const starship = starshipRepository.create(item);
    //   await starshipRepository.save(starship);
    // }

    console.log('Starships seeded successfully');

    try {
      // await this.starshipRepository.save(data);
      console.log('Starships seeded successfully');
    } catch (error) {}
  }
}
