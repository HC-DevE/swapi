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
  CreatePeopleDto,
  DefaultPeopleColumnsResponse,
} from 'src/peoples/dto/create-people.dto';
import { People } from 'src/peoples/entities/people.entity';
import { PeoplesService } from 'src/peoples/services/peoples.service';

@ApiTags('peoples') // put the name of the controller in swagger
@Controller('peoples')
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) {}

  @ApiOperation({ summary: 'create a people' })
  @ApiResponse({
    status: 201,
    type: People,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto) {
    return this.peoplesService.create(createPeopleDto);
  }

  @ApiOperation({ summary: 'get all peoples' })
  @ApiResponse({
    status: 200,
    type: [DefaultPeopleColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.peoplesService.findAll();
  }

  @ApiOperation({ summary: 'get a people by id' })
  @ApiResponse({
    status: 200,
    type: DefaultPeopleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peoplesService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a people' })
  @ApiResponse({
    status: 200,
    type: DefaultPeopleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleDto: CreatePeopleDto) {
    return this.peoplesService.update(+id, updatePeopleDto);
  }

  //delete a people by id
  @ApiOperation({ summary: 'delete a people' })
  remove(@Param('id') id: string) {
    return this.peoplesService.delete(+id);
  }
}
