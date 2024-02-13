import {
  Body,
  Controller,
  Delete,
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
  CreateVehiculeDto,
  DefaultVehiculeColumnsResponse,
} from '../dto/create-vehicule.dto';
import { Vehicule } from '../entities/vehicule.entity';
import { VehiculesService } from '../services/vehicules.service';

@ApiTags('vehicules') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @ApiOperation({ summary: 'create a vehicule' })
  @ApiResponse({
    status: 201,
    type: Vehicule,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createVehiculeDto: CreateVehiculeDto) {
    return this.vehiculesService.create(createVehiculeDto);
  }

  @ApiOperation({ summary: 'get all vehicules' })
  @ApiResponse({
    status: 200,
    type: [DefaultVehiculeColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.vehiculesService.findAll();
  }

  @ApiOperation({ summary: 'get a vehicule by id' })
  @ApiResponse({
    status: 200,
    type: DefaultVehiculeColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculesService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a vehicule' })
  @ApiResponse({
    status: 200,
    type: DefaultVehiculeColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehiculeDto: CreateVehiculeDto,
  ) {
    return this.vehiculesService.update(+id, updateVehiculeDto);
  }

  //delete a vehicule by id
  @Delete(':id')
  @ApiOperation({ summary: 'delete a vehicule' })
  remove(@Param('id') id: string) {
    return this.vehiculesService.delete(+id);
  }
}
