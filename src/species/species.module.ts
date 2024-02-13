import { Module } from '@nestjs/common';
import { SpeciesController } from './controllers/species.controller';
import { SpeciesService } from './services/species.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/species.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  controllers: [SpeciesController],
  providers: [SpeciesService, JwtStrategy],
  exports: [SpeciesService],
})
export class SpeciesModule {}
