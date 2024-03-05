// create-film.dto.ts

// Path: src/films/dto/create-film.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly film_class: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly cost_in_credits: string;

  @ApiProperty({ type: () => [Number] })
  planets: number[];

  @ApiProperty({ type: () => [Number] })
  starships: number[];

  @ApiProperty({ type: () => [Number] })
  vehicles: number[];

  @ApiProperty({ type: () => [Number] })
  species: number[];

  @ApiProperty({ type: () => [Number] })
  characters: number[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly length: string;
}

// update-film.dto.ts
export class UpdateFilmDto extends PartialType(CreateFilmDto) {}

export class DefaultFilmColumnsResponse extends CreateFilmDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
