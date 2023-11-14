import { Module } from '@nestjs/common';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { FilmsController } from './controllers/films.controller';
import { FilmsService } from './services/films.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [FilmsService, JwtStrategy],
  exports: [FilmsService],
})
export class FilmsModule {}
