import { Module } from '@nestjs/common';
import { Planet } from '../planets/entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PlanetsController } from './controllers/planets.controller';
import { PlanetsService } from './services/planets.service';
import { FilmsModule } from 'src/films/films.module';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Planet]), FilmsModule, PeopleModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, JwtStrategy],
  exports: [PlanetsService],
})
export class PlanetsModule {}
