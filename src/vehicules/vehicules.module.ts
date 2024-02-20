import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Vehicle } from './entities/vehicule.entity';
import { VehiclesController } from './controllers/vehicules.controller';
import { VehiclesService } from './services/vehicules.service';
import { PeopleModule } from 'src/people/people.module';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), PeopleModule, FilmsModule],
  controllers: [VehiclesController],
  providers: [VehiclesService, JwtStrategy],
  exports: [VehiclesService],
})
export default class VehiclesModule {}
