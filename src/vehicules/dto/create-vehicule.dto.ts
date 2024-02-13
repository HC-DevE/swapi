// create-vehicule.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';

export class CreateVehiculeDto {
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

  @IsOptional()
  @IsArray()
  readonly films?: string[];

  @IsOptional()
  @IsArray()
  readonly pilotes?: string[];

  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly created: string;
}

export class DefaultVehiculeColumnsResponse extends CreateVehiculeDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
