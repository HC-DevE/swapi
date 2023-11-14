import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePeopleDto,
  UpdatePeopleDto,
} from 'src/peoples/dto/create-people.dto';
import { People } from 'src/peoples/entities/people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeoplesService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  async findAll() {
    return this.peopleRepository.find();
  }

  // async findOne(id: number) {
  //     return await this.peopleRepository.findOne(id);
  // }

  async findOneById(peopleId: number) {
    return await this.peopleRepository.findOne(peopleId);
  }

  //create one
  async create(createSratshipDto: CreatePeopleDto) {
    const createdPeople = await this.peopleRepository.create(createSratshipDto);
    const savePeople = await this.peopleRepository.save(createdPeople);
    return savePeople;
  }

  //update one
  async update(id: number, updatePeopleDto: UpdatePeopleDto) {
    const updatePeople = await this.peopleRepository.update(
      id,
      updatePeopleDto,
    );
    return updatePeople;
  }

  //delete one
  async delete(id: number) {
    const deletePeople = await this.peopleRepository.delete(id);
    return deletePeople;
  }
}
