import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly diameter: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly rotation_period: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly orbital_period: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly gravity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly population: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly climate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly terrain: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly surface_water: string;

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  films: number[];

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  residents: number[];
}

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}

export class DefaultPlanetColumnsResponse extends CreatePlanetDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
