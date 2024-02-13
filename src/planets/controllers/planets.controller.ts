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
  CreatePlanetDto,
  DefaultPlanetColumnsResponse,
} from 'src/planets/dto/create-planet.dto';
import { Planet } from '../entities/planet.entity';
import { PlanetsService } from '../services/planets.service';

@ApiTags('planets') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @ApiOperation({ summary: 'create a planet' })
  @ApiResponse({
    status: 201,
    type: Planet,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @ApiOperation({ summary: 'get all planets' })
  @ApiResponse({
    status: 200,
    type: [DefaultPlanetColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @ApiOperation({ summary: 'get a planet by id' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a planet' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: CreatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  //delete a planet by id
  @ApiOperation({ summary: 'delete a planet' })
  remove(@Param('id') id: string) {
    return this.planetsService.delete(+id);
  }
}

/*import {
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
  CreatePlanetDto,
  DefaultPlanetColumnsResponse,
} from 'src/planets/dto/create-planet.dto';
import { Planet } from 'src/planets/entities/planet.entity';
import { PlanetsService } from 'src/planets/services/planets.service';

@ApiTags('planets') // put the name of the controller in swagger
@Controller('planets')
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @ApiOperation({ summary: 'create a planet' })
  @ApiResponse({
    status: 201,
    type: Planet,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @ApiOperation({ summary: 'get all planets' })
  @ApiResponse({
    status: 200,
    type: [DefaultPlanetColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @ApiOperation({ summary: 'get a planet by id' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
    findOne(@Param('id') id: string) {
      return this.planetsService.findOneById(+id);
    }
  @ApiOperation({ summary: 'update a planet' })
  @ApiResponse({
    status: 200,
    type: DefaultPlanetColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: CreatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  //delete a planet by id
  @ApiOperation({ summary: 'delete a planet' })
  remove(@Param('id') id: string) {
    return this.planetsService.delete(+id);
  }
}*/
