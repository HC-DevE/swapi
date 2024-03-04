import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateSpecieDto,
  DefaultSpecieColumnsResponse,
} from 'src/species/dto/create-specie.dto';
import { Specie } from '../entities/species.entity';
import { SpeciesService } from '../services/species.services';
import { SpecieResponseDto } from '../dto/specie-api-response.dto';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import { PlanetsService } from 'src/planets/services/planets.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('species') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('species')
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly planetService: PlanetsService,
  ) {}

  @ApiOperation({ summary: 'create a specie' })
  @ApiResponse({
    status: 201,
    type: Specie,
  })
  @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createSpecieDto: CreateSpecieDto) {
    return this.speciesService.create(createSpecieDto);
  }

  @ApiOperation({ summary: 'get all species' })
  @ApiResponse({
    status: 200,
    type: [DefaultSpecieColumnsResponse], //or only the column without the array
  })
  @Public() // makes the endpoint accessible to all
  @Get()
  async findAll() {
    const species = await this.speciesService.findAll();
    return species.map((specie) => this.toResponseDto(specie));
  }

  @ApiOperation({ summary: 'get a specie by id' })
  @ApiResponse({
    status: 200,
    type: DefaultSpecieColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const specie = await this.speciesService.findOneById(+id);
    return this.toResponseDto(specie);
  }

  @ApiOperation({ summary: 'update a specie' })
  @ApiResponse({
    status: 200,
    type: DefaultSpecieColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecieDto: CreateSpecieDto) {
    return this.speciesService.update(+id, updateSpecieDto);
  }

  //delete a specie by id
  @ApiOperation({ summary: 'delete a specie' })
  remove(@Param('id') id: string) {
    return this.speciesService.delete(+id);
  }

  private toResponseDto(specie): SpecieResponseDto {
    return {
      ...specie,
      films: specie.films.map(
        (film) => `${process.env.API_BASE_URL}/films/${film.id}`,
      ),
      people: specie.people.map(
        (p) => `${process.env.API_BASE_URL}/people/${p.id}`,
      ),
      // homeworld ??
      homeworld: specie.homeworld
        ? `${process.env.API_BASE_URL}/people/${specie.homeworld}`
        : null,

      url: `${process.env.API_BASE_URL}/species/${specie.id}`,
    };
  }
}
