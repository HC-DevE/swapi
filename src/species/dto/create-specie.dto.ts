import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';

export class CreateSpecieDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly classification: string;

  @ApiProperty()
  @IsString()
  readonly designation: string;

  @ApiProperty()
  @IsString()
  readonly average_height: string;

  @ApiProperty()
  @IsString()
  readonly average_lifespan: string;

  @ApiProperty()
  @IsString()
  readonly hair_colors: string;

  @ApiProperty()
  @IsString()
  readonly skin_colors: string;

  @ApiProperty()
  @IsString()
  readonly eye_colors: string;

  @ApiProperty({ type: () => Planet })
  @IsNumber()
  @IsString({ message: 'Must be a valid planet ID' })
  readonly homeworld: Planet['id'];

  @ApiProperty()
  @IsNumber()
  readonly language: string;

  @ApiProperty({ type: () => [Film] })
  films: Film['id'][];

  @ApiProperty({ type: () => [People] })
  people: People['id'][];
}

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}

export class DefaultSpecieColumnsResponse extends CreateSpecieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly edited: Date;

  @ApiProperty()
  readonly created: Date;
}
