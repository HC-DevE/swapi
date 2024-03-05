import {
  Body,
  Controller,
  Get,
  // Header,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateFilmDto,
  DefaultFilmColumnsResponse,
} from 'src/films/dto/create-film.dto';
import { Film } from 'src/films/entities/film.entity';
import { FilmsService } from 'src/films/services/films.service';

@ApiTags('films') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({ summary: 'create a film' })
  @ApiResponse({
    status: 201,
    type: Film,
  })
  // @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'seed films' })
  @ApiResponse({
    status: 201,
    type: Film,
  })
  @Public() // makes the endpoint accessible to all
  @Get('seed')
  seedAll(): Promise<any> {
    return this.filmsService.seedAll();
  }

  @ApiOperation({ summary: 'get all films' })
  @ApiResponse({
    status: 200,
    type: [DefaultFilmColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  async findAll() {
    const films = await this.filmsService.findAll();
    return films.map((planet) => this.toResponseDto(planet));
  }

  @ApiOperation({ summary: 'get a film by id' })
  @ApiResponse({
    status: 200,
    type: DefaultFilmColumnsResponse,
  })
  // @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    const film = this.filmsService.findOneById(+id);
    return this.toResponseDto(film);
  }

  @ApiOperation({ summary: 'update a film' })
  @ApiResponse({
    status: 200,
    type: DefaultFilmColumnsResponse,
  })
  // @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: CreateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  //delete a film by id
  @ApiOperation({ summary: 'delete a film' })
  remove(@Param('id') id: string) {
    return this.filmsService.delete(+id);
  }

  private toResponseDto(film): any {
    return {
      ...film,
      planets: film.planets.map(
        (planet) => `${process.env.API_BASE_URL}/planets/${planet.id}`,
      ),
      species: film.species.map(
        (specie) => `${process.env.API_BASE_URL}/species/${specie.id}`,
      ),
      starships: film.starships.map(
        (starship) => `${process.env.API_BASE_URL}/starships/${starship.id}`,
      ),
      vehicles: film.vehicles.map(
        (vehicle) => `${process.env.API_BASE_URL}/vehicles/${vehicle.id}`,
      ),
      characters: film.characters.map(
        (resident) => `${process.env.API_BASE_URL}/people/${resident.id}`,
      ),
      url: `${process.env.API_BASE_URL}/films/${film.id}`,
    };
  }
}
