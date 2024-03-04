import { Module } from '@nestjs/common';
import { People } from './entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [PeopleController],
  providers: [PeopleService, JwtStrategy],
  exports: [PeopleService],
})
export class PeopleModule {}
