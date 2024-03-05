import { Module, forwardRef } from '@nestjs/common';
import { Starship } from './entities/starship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { StarshipsController } from './controllers/starships.controller';
import { StarshipsService } from './services/starships.service';
import { FilmsModule } from 'src/films/films.module';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    forwardRef(() => FilmsModule),
    forwardRef(() => PeopleModule),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService, JwtStrategy],
  exports: [StarshipsService],
})
export class StarshipsModule {}
