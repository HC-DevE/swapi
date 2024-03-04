// create-starship.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { Film } from 'src/films/entities/film.entity';
// import { People } from 'src/people/entities/people.entity';

export class CreateStarshipDto {
  //id
  @ApiProperty({ description: `The ID of the starship` })
  @IsOptional()
  id?: number;

  //created
  @ApiProperty({ description: `The date the starship was created` })
  @IsOptional()
  createdAt?: Date;

  //edited
  @ApiProperty({ description: `The date the starship was edited` })
  @IsOptional()
  updatedAt?: Date;

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
  readonly starship_class: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly cost_in_credits: string;

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  films?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  pilots?: number[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly length: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly crew: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly passengers: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly max_atmosphering_speed: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly hyperdrive_rating: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly MGLT: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly cargo_capacity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly consumables: string;
}

// update-starship.dto.ts
export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}

export class DefaultStarshipColumnsResponse extends CreateStarshipDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
