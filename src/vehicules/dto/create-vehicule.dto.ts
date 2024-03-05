// create-vehicule.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly vehicle_class: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly passengers: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly max_atmosphering_speed: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly crew: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly consumables: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly cargo_capacity: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly manufacturer: string;

  @ApiProperty({ type: () => String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly cost_in_credits: string;

  @ApiProperty({ type: () => String, required: true })
  @IsOptional()
  @IsString()
  readonly length: string;

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  @IsArray()
  readonly films?: number[];

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  @IsArray()
  readonly pilots?: number[];
}

export class DefaultVehicleColumnsResponse extends CreateVehicleDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
