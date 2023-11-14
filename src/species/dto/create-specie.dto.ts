import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

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

  //@ApiProperty()
  //@isArray()
  //readonly people: number[];

  //@ApiProperty()
  //@isArray()
  //readonly films: number[];

  @ApiProperty()
  @IsString()
  readonly url: string;
}

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}
