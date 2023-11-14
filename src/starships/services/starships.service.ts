import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async findAll() {
    return this.starshipRepository.find();
  }

  // async findOne(id: number) {
  //     return await this.starshipRepository.findOne(id);
  // }

  async findOneById(starshipId: number) {
    return await this.starshipRepository.findOne(starshipId);
  }

  //create one
  async create(createSratshipDto: CreateStarshipDto) {
    const createdStarship = await this.starshipRepository.create(
      createSratshipDto,
    );
    const saveStarship = await this.starshipRepository.save(createdStarship);
    return saveStarship;
  }

  //update one
  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const updateStarship = await this.starshipRepository.update(
      id,
      updateStarshipDto,
    );
    return updateStarship;
  }

  //delete one
  async delete(id: number) {
    const deleteStarship = await this.starshipRepository.delete(id);
    return deleteStarship;
  }
}
