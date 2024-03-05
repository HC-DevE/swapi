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
  CreateStarshipDto,
  UpdateStarshipDto,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { Repository } from 'typeorm';
import * as starshipJsonData from '../../../Json/starships.json';
import * as transportJsonData from '../../../Json/transport.json';
import * as vehicleJsonData from '../../../Json/vehicles.json';
// import { Vehicle } from 'src/vehicules/entities/vehicule.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    // private vehicleRepository: Repository<Vehicle>,
    @Inject(forwardRef(() => FilmsService)) private filmService: FilmsService,
    @Inject(forwardRef(() => PeopleService))
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
    const transportJsonData2 = [
      transportJsonData[0],
      transportJsonData[1],
      transportJsonData[2],
      transportJsonData[3],
      transportJsonData[4],
      transportJsonData[5],
      transportJsonData[6],
      transportJsonData[7],
      transportJsonData[8],
      transportJsonData[9],
      transportJsonData[10],
    ];

    for (const transportItem of transportJsonData2) {
      const starshipDetail = starshipJsonData.find(
        (s) => s.pk === transportItem.pk,
      );
      if (starshipDetail) {
        const createStarshipDto = {
          ...transportItem.fields,
          ...starshipDetail.fields,
          updatedAt: new Date(transportItem.fields.edited),
          createdAt: new Date(transportItem.fields.created),
          id: starshipDetail.pk,
        };

        // const starship = new Starship();

        // Object.assign(starship, createStarshipDto);
        // console.log(starship);
        const newStarship = await this.create(createStarshipDto);
        console.log(newStarship);
        // const starship = this.starshipRepository.create({ ...transportItem, ...starshipDetail });
        // await this.starshipRepository.save(starship);
      }

      const vehicleDetail = vehicleJsonData.find(
        (v) => v.pk === transportItem.pk,
      );
      if (vehicleDetail) {
        // const newVehicle = { ...transportItem, ...vehicleDetail };
        // console.log('vehicle', {
        //   ...transportItem.fields,
        //   ...vehicleDetail?.fields,
        //   id: transportItem.pk,
        // });
        //   const vehicle = this.vehicleRepository.create(newVehicle);
        //   await this.vehicleRepository.save(vehicle);
      }
    }

    try {
      // await this.starshipRepository.save(data);
      console.log('Starships seeded successfully');
    } catch (error) {}
  }
}
