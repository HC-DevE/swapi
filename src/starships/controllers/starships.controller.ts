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
import { FilmsService } from 'src/films/services/films.service';
import { PeopleService } from 'src/people/services/people.service';
import {
  CreateStarshipDto,
  DefaultStarshipColumnsResponse,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { StarshipsService } from 'src/starships/services/starships.service';
import { StarshipResponseDTO } from '../dto/starship-api-response.dto';

@ApiTags('starships') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
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
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto): Promise<Starship> {
    return this.starshipsService.create(createStarshipDto);
  }

  @ApiOperation({ summary: 'get all starships' })
  @ApiResponse({
    status: 200,
    type: [DefaultStarshipColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll(): Promise<StarshipResponseDTO[]> {
    const starships = this.starshipsService.findAll();
    return starships.then((starships) =>
      starships.map((starship) => this.toResponseDto(starship)),
    );
  }

  @ApiOperation({ summary: 'get a starship by id' })
  @ApiResponse({
    status: 200,
    type: DefaultStarshipColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string): Promise<StarshipResponseDTO> {
    const starship = this.starshipsService.findOneById(+id);
    return Promise.resolve(this.toResponseDto(starship));
  }

  @ApiOperation({ summary: 'update a starship' })
  @ApiResponse({
    status: 200,
    type: DefaultStarshipColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStarshipDto: CreateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  //delete a starship by id
  @ApiOperation({ summary: 'delete a starship' })
  remove(@Param('id') id: string) {
    return this.starshipsService.delete(+id);
  }

  private toResponseDto(starship): StarshipResponseDTO {
    return {
      ...starship,
      films: starship.films.map(
        (film) => `${process.env.API_BASE_URL}/films/${film.id}`,
      ),
      pilots: starship.pilots.map(
        (pilot) => `${process.env.API_BASE_URL}/people/${pilot.id}`,
      ),
    };
  }
}
