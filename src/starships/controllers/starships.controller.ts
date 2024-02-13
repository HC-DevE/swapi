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
  CreateStarshipDto,
  DefaultStarshipColumnsResponse,
} from 'src/starships/dto/create-starship.dto';
import { Starship } from 'src/starships/entities/starship.entity';
import { StarshipsService } from 'src/starships/services/starships.service';

@ApiTags('starships') // put the name of the controller in swagger
@UseGuards(JwtAuthGuard) //  makes the all routs as private by default
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @ApiOperation({ summary: 'create a starship' })
  @ApiResponse({
    status: 201,
    type: Starship,
  })
  //   @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @ApiOperation({ summary: 'get all starships' })
  @ApiResponse({
    status: 200,
    type: [DefaultStarshipColumnsResponse], //or only the column without the array
  })
  // @Public() // makes the endpoint accessible to all
  @Get()
  findAll() {
    return this.starshipsService.findAll();
  }

  @ApiOperation({ summary: 'get a starship by id' })
  @ApiResponse({
    status: 200,
    type: DefaultStarshipColumnsResponse,
  })
  //   @Public() // makes the endpoint accessible to all
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starshipsService.findOneById(+id);
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
}
