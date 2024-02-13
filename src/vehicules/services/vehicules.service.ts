import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicule.entity';
import { CreateVehicleDto } from '../dto/create-vehicule.dto';
import { UpdateVehicleDto } from '../dto/update-vehicule.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
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
    const createdVehicule = await this.vehicleRepository.create(
      createVehicleDto,
    );
    const saveVehicule = await this.vehicleRepository.save(createdVehicule);
    return saveVehicule;
  }

  //update one
  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const updateVehicule = await this.vehicleRepository.update(
      id,
      updateVehicleDto,
    );
    return updateVehicule;
  }

  //delete one
  async delete(id: number) {
    const deleteVehicule = await this.vehicleRepository.delete(id);
    return deleteVehicule;
  }
}
