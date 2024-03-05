// create-film.dto.ts

// Path: src/films/dto/create-film.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  episod_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  producer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  release_date: string;

  @ApiProperty({ type: () => [Number], required: false })
  planets?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  starships?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  vehicles?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  species?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  characters?: number[];
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
