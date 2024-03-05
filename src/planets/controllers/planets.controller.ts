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
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreatePlanetDto,
  DefaultPlanetColumnsResponse,
  UpdatePlanetDto,
} from 'src/planets/dto/create-planet.dto';
import { Planet } from '../entities/planet.entity';
import { PlanetsService } from '../services/planets.service';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import { PlanetResponseDto } from '../dto/planet-api-response.dto';

@ApiTags('planets') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('planets')
export class PlanetsController {
  constructor(
    private readonly planetsService: PlanetsService,
    private readonly filmsService: FilmsService,
    private readonly peoplesService: PeopleService,
  ) {}

  @ApiOperation({ summary: 'create a planet' })
  @ApiResponse({
    status: 201,
    type: Planet,
  })
  @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @ApiOperation({ summary: 'seed planets' })
  @ApiResponse({
    status: 201,
    type: Planet,
  })
  @Public() // makes the endpoint accessible to all
  @Get('seed')
  seedAll(): Promise<any> {
    return this.planetsService.seedAll();
  }

  @ApiOperation({ summary: 'get all planets' })
  @ApiResponse({
    status: 200,
    type: [DefaultPlanetColumnsResponse], //or only the column without the array
  })
  @Public() // makes the endpoint accessible to all
  @Get()
  async findAll() {
    const planets = await this.planetsService.findAll();

    return planets.map((planet) => this.toResponseDto(planet));
  }

  @ApiOperation({ summary: 'get a planet by id' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const planet = await this.planetsService.findOneById(+id);

    return this.toResponseDto(planet);
  }

  @ApiOperation({ summary: 'update a planet' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  //delete a planet by id
  @ApiOperation({ summary: 'delete a planet' })
  remove(@Param('id') id: string) {
    return this.planetsService.delete(+id);
  }

  private toResponseDto(planet): PlanetResponseDto {
    return {
      ...planet,
      films: planet.films.map(
        (film) => `${process.env.API_BASE_URL}/films/${film.id}`,
      ),
      residents: planet.residents.map(
        (resident) => `${process.env.API_BASE_URL}/people/${resident.id}`,
      ),
      url: `${process.env.API_BASE_URL}/planets/${planet.id}`,
    };
  }
}
