import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpeciesService } from '../services/species.services';
//import { Public } from 'src/auth/decorators/public.decorator';
import { CreateSpecieDto } from '../dto/create-specie.dto';

@ApiTags('species') // put the name of the controller in swagger
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOperation({ summary: 'display all species' })
  @ApiResponse({
    status: 201,
  })
  //@Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @ApiOperation({ summary: 'create a new specie' })
  @ApiResponse({
    status: 201,
  })
  //@Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createSpecieDto: CreateSpecieDto) {
    return this.speciesService.create(createSpecieDto);
  }
}
