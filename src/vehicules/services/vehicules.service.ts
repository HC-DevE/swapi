import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicule } from '../entities/vehicule.entity';
import { CreateVehiculeDto } from '../dto/create-vehicule.dto';
import { UpdateVehiculeDto } from '../dto/update-vehicule.dto';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(Vehicule)
    private vehiculeRepository: Repository<Vehicule>,
  ) {}

  async findAll() {
    return this.vehiculeRepository.find();
  }

  // async findOne(id: number) {
  //     return await this.vehiculeRepository.findOne(id);
  // }

  async findOneById(vehiculeId: number) {
    return await this.vehiculeRepository.findOne(vehiculeId);
  }

  //create one
  async create(createVehiculeDto: CreateVehiculeDto) {
    const createdVehicule = await this.vehiculeRepository.create(
      createVehiculeDto,
    );
    const saveVehicule = await this.vehiculeRepository.save(createdVehicule);
    return saveVehicule;
  }

  //update one
  async update(id: number, updateVehiculeDto: UpdateVehiculeDto) {
    const updateVehicule = await this.vehiculeRepository.update(
      id,
      updateVehiculeDto,
    );
    return updateVehicule;
  }

  //delete one
  async delete(id: number) {
    const deleteVehicule = await this.vehiculeRepository.delete(id);
    return deleteVehicule;
  }
}
