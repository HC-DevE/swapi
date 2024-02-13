import { Module } from '@nestjs/common';
import { Planet } from '../planets/entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PlanetsController } from './controllers/planets.controller';
import { PlanetsService } from './services/planets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService, JwtStrategy],
  exports: [PlanetsService],
})
export class PlanetsModule {}
