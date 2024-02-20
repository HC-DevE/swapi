import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicule.entity';
import { CreateVehicleDto } from '../dto/create-vehicule.dto';
import { UpdateVehicleDto } from '../dto/update-vehicule.dto';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private filmsService: FilmsService,
    private peopleService: PeopleService,
  ) {}

  async findAll() {
    return this.vehicleRepository.find();
  }

  // async findOne(id: number) {
  //     return await this.vehicleRepository.findOne(id);
  // }

  async findOneById(vehiculeId: number) {
    return await this.vehicleRepository.findOne(vehiculeId);
  }

  //create one
  async create(createVehicleDto: CreateVehicleDto) {
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
  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
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
  async delete(id: number) {
    const deleteVehicule = await this.vehicleRepository.delete(id);
    return deleteVehicule;
  }
}
