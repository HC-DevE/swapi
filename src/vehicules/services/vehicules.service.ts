import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicule.entity';
import { CreateVehicleDto } from '../dto/create-vehicule.dto';
import { UpdateVehicleDto } from '../dto/update-vehicule.dto';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
// import { StarshipResponseDTO } from 'src/starships/dto/starship-api-response.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private filmsService: FilmsService,
    private peopleService: PeopleService,
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

  //create one
  async create(createVehicleDto: CreateVehicleDto) {
    const vehicule = await this.vehicleRepository.findOne({
      where: { name: createVehicleDto.nom },
    });

    if (vehicule)
      throw new BadRequestException('Véhicule avec ce nom existe déjà');

    let films = [];
    if (createVehicleDto.films) {
      films = await this.filmsService.findAllByIds(createVehicleDto.films);
    }
    let pilots = [];
    if (createVehicleDto.pilots) {
      pilots = await this.peopleService.findAllByIds(createVehicleDto.pilots);
    }

    const newVehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      films,
      pilots,
    });

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
}
