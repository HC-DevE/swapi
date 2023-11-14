// create-people.dto.ts

// Path: src/peoples/dto/create-people.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { People } from 'src/peoples/entities/people.entity';
// import { People } from 'src/people/entities/people.entity';

export class CreatePeopleDto {
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
  readonly people_class: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly cost_in_credits: string;

  // @ApiProperty({ type: () => [People] })
  // peoples: People[];

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
