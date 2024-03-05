// create-people.dto.ts

// Path: src/people/dto/create-people.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ type: () => [Number] })
  @IsOptional()
  readonly homeworld?: number;

  @ApiProperty({ type: () => [Number] })
  @IsOptional()
  readonly films?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsOptional()
  readonly species?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsOptional()
  readonly vehicles?: number[];

  @ApiProperty({ type: () => [Number] })
  @IsOptional()
  public starships?: number[];
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
