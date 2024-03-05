import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import {
  CreateStarshipDto,
  DefaultStarshipColumnsResponse,
  UpdateStarshipDto,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { StarshipsService } from 'src/starships/services/starships.service';
import { StarshipResponseDTO } from '../dto/starship-api-response.dto';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
// import { SentryInterceptor } from 'src/sentry.interceptor';

@ApiTags('starships') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
// @UseInterceptors(SentryInterceptor) // use the sentry interceptor
@Controller('starships')
export class StarshipsController {
  constructor(
    private readonly starshipsService: StarshipsService,
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {}

  @ApiOperation({ summary: 'create a starship' })
  @ApiResponse({
    status: 201,
    type: Starship,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 498,
    description: 'Token Expired',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable',
  })
  @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto): Promise<Starship> {
    return this.starshipsService.create(createStarshipDto);
  }

  @ApiOperation({ summary: 'seed starship' })
  @ApiResponse({
    status: 201,
    type: Starship,
  })
  @Public() // makes the endpoint accessible to all
  @Get('seed')
  seedAll(): Promise<any> {
    return this.starshipsService.seedAll();
  }

  @ApiOperation({ summary: 'get all starships' })
  @ApiResponse({
    status: 200,
    type: [DefaultStarshipColumnsResponse], //or only the column without the array
  })
  @Public() // makes the endpoint accessible to all
  @Get()
  async findAll(): Promise<StarshipResponseDTO[]> {
    const starships = await this.starshipsService.findAll();
    return starships.map((starship) => this.toResponseDto(starship));
  }

  @ApiOperation({ summary: 'get a starship by id' })
  @ApiResponse({
    status: 200,
    type: DefaultStarshipColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StarshipResponseDTO> {
    const starship = await this.starshipsService.findOneById(+id);
    return this.toResponseDto(starship);
  }

  @ApiOperation({ summary: 'update a starship' })
  @ApiResponse({
    status: 200,
    type: DefaultStarshipColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    const updatedStarship = await this.starshipsService.update(
      +id,
      updateStarshipDto,
    );
    return this.toResponseDto(updatedStarship);
  }

  //delete a starship by id
  @ApiOperation({ summary: 'delete a starship' })
  remove(@Param('id') id: string) {
    return this.starshipsService.delete(+id);
  }

  private toResponseDto(starship): StarshipResponseDTO {
    return {
      ...starship,
      films: starship.films?.map(
        (film: Film) => `${process.env.API_BASE_URL}/films/${film?.id}`,
      ),
      pilots: starship.pilots?.map(
        (pilot: People) => `${process.env.API_BASE_URL}/people/${pilot?.id}`,
      ),
    };
  }
}
