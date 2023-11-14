import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specie } from '../entities/species.entity';
import { CreateSpecieDto } from '../dto/create-specie.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private specieRepository: Repository<Specie>,
  ) {}

  async findAll() {
    return this.specieRepository.find();
  }

  /*async findOne(id: number) {
    return await this.specieRepository.findOne(id);
  }*/

  async findById(specieId: number) {
    return await this.specieRepository.findOneOrFail(specieId);
  }

  async findByName(name: string) {
    return await this.specieRepository.findOneOrFail({
      where: { name },
    });
  }

  async create(createSpecieDto: CreateSpecieDto) {
    const specie = await this.specieRepository.findOne({
      name: createSpecieDto.name,
    });

    if (specie) {
      throw new BadRequestException();
    }

    const createdSpecie = this.specieRepository.create(createSpecieDto);
    const saveSpecie = await this.specieRepository.save(createdSpecie);
    return saveSpecie;
  }

  /*
  async update(id: number, updateSpecieDto: UpdateSpecieDto) {
    const specie = await this.specieRepository.preload({
      id,
      ...updateSpecieDto,
    });
    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }
    return this.specieRepository.save(specie);
  }

  async remove(id: number) {
    const specie = await this.specieRepository.findOne(id);

    if (!specie) {
      throw new NotFoundException(`Specie with id ${id} does not exist`);
    }

    return this.specieRepository.remove(specie);
  }
  */
}
