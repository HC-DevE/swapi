import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicule.entity';
import { CreateVehicleDto } from '../dto/create-vehicule.dto';
import { UpdateVehicleDto } from '../dto/update-vehicule.dto';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
// import { StarshipResponseDTO } from 'src/starships/dto/starship-api-response.dto';
import * as vehicleJsonData from '../../../Json/vehicles.json';
import * as transportJsonData from '../../../Json/transport.json';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    @Inject(forwardRef(() => FilmsService))
    private readonly filmsService: FilmsService,
    @Inject(forwardRef(() => PeopleService))
    private readonly peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.vehicleRepository.find({ relations: ['films', 'pilots'] });
  }

  // async findOne(id: number) {
  //     return await this.vehicleRepository.findOne(id);
  // }

  async findOneById(vehiculeId: number) {
    return await this.vehicleRepository.findOne(vehiculeId, {
      relations: ['films', 'pilots'],
    });
  }

  //find all by ids
  async findAllByIds(ids: number[]) {
    return await this.vehicleRepository.findByIds(ids);
  }

  //create one
  async create(createVehicleDto: CreateVehicleDto) {
    const vehicule = await this.vehicleRepository.findOne({
      where: { name: createVehicleDto.name },
    });

    if (vehicule)
      throw new BadRequestException('Véhicule avec ce nom existe déjà');

    const vehicle = new Vehicle();
    Object.assign(vehicle, createVehicleDto);

    if (createVehicleDto.films) {
      vehicle.films = await this.filmsService.findAllByIds(
        createVehicleDto.films,
      );
    }

    if (createVehicleDto.pilots) {
      vehicle.pilots = await this.peopleService.findAllByIds(
        createVehicleDto.pilots,
      );
    }

    const newVehicle = this.vehicleRepository.create(vehicle);

    return await this.vehicleRepository.save(newVehicle);
  }

  //update one
  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<any> {
    const vehicle = await this.vehicleRepository.findOne(id);

    if (!vehicle) throw new BadRequestException('Véhicule non trouvé');

    let films = [];
    if (updateVehicleDto.films) {
      films = await this.filmsService.findAllByIds(updateVehicleDto.films);
    }

    let pilots = [];
    if (updateVehicleDto.pilots) {
      pilots = await this.peopleService.findAllByIds(pilots);
    }

    if (vehicle) {
      const updatedVehicle = await this.vehicleRepository.update(id, {
        ...updateVehicleDto,
        films,
        pilots,
      });
      return updatedVehicle;
    }
  }

  //delete one
  async delete(id: number): Promise<{ message: string }> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) throw new BadRequestException('Véhicule non trouvé');

    await this.vehicleRepository.remove(vehicle);
    return { message: 'Véhicule supprimé' };
  }

  //seed
  async seedAll() {
    for (const transportItem of transportJsonData) {
      try {
        const vehicleDetail = vehicleJsonData.find(
          (v) => v.pk === transportItem.pk,
        );

        if (vehicleDetail) {
          const createVehicle = {
            ...transportItem.fields,
            ...vehicleDetail.fields,
            updatedAt: new Date(transportItem.fields.edited),
            createdAt: new Date(transportItem.fields.created),
            id: vehicleDetail.pk,
          };
          const vehicleExists = await this.vehicleRepository.findOne(
            createVehicle.id,
          );
          if (vehicleExists) {
            await this.update(createVehicle.id, createVehicle);
          } else {
            await this.create(createVehicle);
          }
        }
        console.log('Starships seeded successfully');
      } catch (error) {
        console.log('Error seeding vehicles', error);
      }
    }
  }
}
