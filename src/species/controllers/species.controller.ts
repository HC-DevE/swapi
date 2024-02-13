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

@ApiTags('species') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOperation({ summary: 'create a specie' })
  @ApiResponse({
    status: 201,
    type: Specie,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createSpecieDto: CreateSpecieDto) {
    return this.speciesService.create(createSpecieDto);
  }

  @ApiOperation({ summary: 'get all species' })
  @ApiResponse({
    status: 200,
    type: [DefaultSpecieColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @ApiOperation({ summary: 'get a specie by id' })
  @ApiResponse({
    status: 200,
    type: DefaultSpecieColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a specie' })
  @ApiResponse({
    status: 200,
    type: DefaultSpecieColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecieDto: CreateSpecieDto) {
    return this.speciesService.update(+id, updateSpecieDto);
  }

  //delete a specie by id
  @ApiOperation({ summary: 'delete a specie' })
  remove(@Param('id') id: string) {
    return this.speciesService.delete(+id);
  }
}

/*import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpeciesService } from '../services/species.services';
//import { Public } from 'src/auth/decorators/public.decorator';
import { CreateSpecieDto } from '../dto/create-specie.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('species') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard)
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
}*/
