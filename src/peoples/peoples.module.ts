import { Module } from '@nestjs/common';
import { People } from './entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PeoplesController } from './controllers/peoples.controller';
import { PeoplesService } from './services/peoples.service';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [PeoplesController],
  providers: [PeoplesService, JwtStrategy],
  exports: [PeoplesService],
})
export class PeoplesModule {}
