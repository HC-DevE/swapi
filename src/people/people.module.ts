import { Module, forwardRef } from '@nestjs/common';
import { People } from './entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';
import { FilmsModule } from 'src/films/films.module';
import { SpeciesModule } from 'src/species/species.module';
import VehiclesModule from 'src/vehicules/vehicules.module';
import { PlanetsModule } from 'src/planets/planets.module';
import { StarshipsModule } from 'src/starships/starships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    forwardRef(() => FilmsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => VehiclesModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => StarshipsModule),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, JwtStrategy],
  exports: [PeopleService],
})
export class PeopleModule {}
