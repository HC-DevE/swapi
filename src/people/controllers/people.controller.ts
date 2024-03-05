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
  CreatePeopleDto,
  DefaultPeopleColumnsResponse,
} from 'src/people/dto/create-people.dto';
import { People } from 'src/people/entities/people.entity';
import { PeopleService } from 'src/people/services/people.service';

@ApiTags('people') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOperation({ summary: 'create a people' })
  @ApiResponse({
    status: 201,
    type: People,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto) {
    return this.peopleService.create(createPeopleDto);
  }

  @ApiOperation({ summary: 'seed people' })
  @ApiResponse({
    status: 201,
    type: People,
  })
  @Public() // makes the endpoint accessible to all
  @Get('seed')
  seedAll(): Promise<any> {
    return this.peopleService.seedAll();
  }

  @ApiOperation({ summary: 'get all people' })
  @ApiResponse({
    status: 200,
    type: [DefaultPeopleColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @ApiOperation({ summary: 'get a people by id' })
  @ApiResponse({
    status: 200,
    type: DefaultPeopleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOneById(+id);
  }

  @ApiOperation({ summary: 'update a people' })
  @ApiResponse({
    status: 200,
    type: DefaultPeopleColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleDto: CreatePeopleDto) {
    return this.peopleService.update(+id, updatePeopleDto);
  }

  //delete a people by id
  @Delete(':id')
  @ApiOperation({ summary: 'delete a people' })
  remove(@Param('id') id: string) {
    return this.peopleService.delete(+id);
  }
}
