// create-vehicule.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  readonly nom: string;

  @IsNotEmpty()
  @IsString()
  readonly modèle: string;

  @IsNotEmpty()
  @IsString()
  readonly classe_vehicule: string;

  @IsNotEmpty()
  @IsString()
  readonly fabricant: string;

  @IsNotEmpty()
  @IsString()
  readonly coût_en_crédits: string;

  @IsNotEmpty()
  @IsString()
  readonly longueur: string;

  @IsNotEmpty()
  @IsString()
  readonly équipage: string;

  @IsNotEmpty()
  @IsString()
  readonly passagers: string;

  @IsNotEmpty()
  @IsString()
  readonly vitesse_max_atmosphérique: string;

  @IsNotEmpty()
  @IsString()
  readonly capacité_cargo: string;

  @IsNotEmpty()
  @IsString()
  readonly consommables: string;

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  @IsArray()
  readonly films: number[];

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  @IsArray()
  readonly pilots: number[];
}

export class DefaultVehicleColumnsResponse extends CreateVehicleDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
