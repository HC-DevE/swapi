import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/peoples/entities/people.entity';

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

  @ApiProperty()
  @IsNumber()
  readonly homeworld: string;

  @ApiProperty()
  @IsNumber()
  readonly language: string;

  @ApiProperty({ type: () => [Film] })
  films: string[];

  @ApiProperty({ type: () => [People] })
  peoples: string[];

  @ApiProperty()
  @IsString()
  readonly url: string;
}

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}

export class DefaultSpecieColumnsResponse extends CreateSpecieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
