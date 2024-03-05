import { Module, forwardRef } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { FilmsController } from './controllers/films.controller';
import { FilmsService } from './services/films.service';
import { PeopleModule } from 'src/people/people.module';
import { PlanetsModule } from 'src/planets/planets.module';
import { SpeciesModule } from 'src/species/species.module';
import VehiclesModule from 'src/vehicules/vehicules.module';
import { StarshipsModule } from 'src/starships/starships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => VehiclesModule),
    forwardRef(() => StarshipsModule),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, JwtStrategy],
  exports: [FilmsService],
})
export class FilmsModule {}
