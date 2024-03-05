import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicule.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class vehicleResponseDTO extends CreateVehicleDto {
  url: string;
}
