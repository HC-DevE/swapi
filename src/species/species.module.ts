import { Module } from '@nestjs/common';
import { SpeciesController } from './controllers/species.controller';
import { SpeciesService } from './services/species.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/species.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PlanetsModule } from 'src/planets/planets.module';
import { FilmsModule } from 'src/films/films.module';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specie]),
    PlanetsModule,
    FilmsModule,
    PeopleModule,
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService, JwtStrategy],
  exports: [SpeciesService],
})
export class SpeciesModule {}
