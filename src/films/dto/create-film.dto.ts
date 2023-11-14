// create-film.dto.ts

// Path: src/films/dto/create-film.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { Film } from 'src/films/entities/film.entity';
// import { People } from 'src/people/entities/people.entity';

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

  // @ApiProperty({ type: () => [Film] })
  // films: Film[];

  // @ApiProperty({ type: () => [People] })
  // pilots: People[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly length: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly peoples: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly url: string;
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
