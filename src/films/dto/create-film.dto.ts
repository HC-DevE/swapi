// create-film.dto.ts

// Path: src/films/dto/create-film.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { People } from 'src/people/entities/people.entity';
// import { Film } from '../entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicules/entities/vehicule.entity';
import { Specie } from 'src/species/entities/species.entity';

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

  @ApiProperty({ type: () => [Planet] })
  planets: Planet[];

  @ApiProperty({ type: () => [Starship] })
  starships: Starship[];

  @ApiProperty({ type: () => [Vehicle] })
  vehicles: Vehicle[];

  @ApiProperty({ type: () => [Specie] })
  species: Specie[];

  @ApiProperty({ type: () => [People] })
  characters: People[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly length: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly people: string;
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
