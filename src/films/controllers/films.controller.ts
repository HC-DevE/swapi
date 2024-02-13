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
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'get all films' })
  @ApiResponse({
    status: 200,
    type: [DefaultFilmColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @ApiOperation({ summary: 'get a film by id' })
  @ApiResponse({
    status: 200,
    type: DefaultFilmColumnsResponse,
  })
  // @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOneById(+id);
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
}
