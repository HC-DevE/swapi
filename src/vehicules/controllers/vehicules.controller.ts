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
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateVehicleDto,
  DefaultVehicleColumnsResponse,
} from '../dto/create-vehicule.dto';
import { Vehicle } from '../entities/vehicule.entity';
import { VehiclesService } from '../services/vehicules.service';

@ApiTags('vehicles') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'create a vehicle' })
  @ApiResponse({
    status: 201,
    type: Vehicle,
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
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'get all vehicles' })
  @ApiResponse({
    status: 200,
    type: [DefaultVehicleColumnsResponse], //or only the column without the array
  })
  @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @ApiOperation({ summary: 'get a vehicle by id' })
  @ApiResponse({
    status: 200,
    type: DefaultVehicleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a vehicle' })
  @ApiResponse({
    status: 200,
    type: DefaultVehicleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  //delete a vehicle by id
  @Delete(':id')
  @ApiOperation({ summary: 'delete a vehicle' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.delete(+id);
  }
}
