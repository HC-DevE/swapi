import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSpecieDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly classification: string;

  @ApiProperty()
  @IsString()
  readonly designation: string;

  @ApiProperty()
  @IsString()
  readonly average_height: string;

  @ApiProperty()
  @IsString()
  readonly average_lifespan: string;

  @ApiProperty()
  @IsString()
  readonly hair_colors: string;

  @ApiProperty()
  @IsString()
  readonly skin_colors: string;

  @ApiProperty()
  @IsString()
  readonly eye_colors: string;

  @ApiProperty({ type: () => Number, required: false })
  @IsNumber()
  // @IsString({ message: 'Must be a valid planet ID' })
  readonly homeworld: number;

  @ApiProperty()
  @IsNumber()
  readonly language: string;

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  films: number[];

  @ApiProperty({ type: () => [Number], required: false })
  @IsOptional()
  people: number[];
}

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}

export class DefaultSpecieColumnsResponse extends CreateSpecieDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly edited: Date;

  @ApiProperty()
  readonly created: Date;
}
