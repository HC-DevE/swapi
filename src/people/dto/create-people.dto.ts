// create-people.dto.ts

// Path: src/people/dto/create-people.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicules/entities/vehicule.entity';

export class CreatePeopleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly height: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly mass: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly hair_color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly skin_color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly eye_color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly birth_year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty({ type: () => [Planet] })
  @IsOptional()
  readonly homeworld: Planet;

  @ApiProperty({ type: () => [Film] })
  @IsOptional()
  readonly films: Film[];

  @ApiProperty({ type: () => [Specie] })
  @IsOptional()
  readonly species: Specie[];

  @ApiProperty({ type: () => [Vehicle] })
  @IsOptional()
  readonly vehicles: Vehicle[];
}

// update-people.dto.ts
export class UpdatePeopleDto extends PartialType(CreatePeopleDto) {}

export class DefaultPeopleColumnsResponse extends CreatePeopleDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
