import { Module } from '@nestjs/common';
import { Starship } from './entities/starship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { StarshipsController } from './controllers/starships.controller';
import { StarshipsService } from './services/starships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  controllers: [StarshipsController],
  providers: [StarshipsService, JwtStrategy],
  exports: [StarshipsService],
})
export class StarshipsModule {}
