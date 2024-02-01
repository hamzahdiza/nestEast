import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroesService } from './hero.service';

@Module({
  controllers: [HeroController],
  providers: [HeroesService],
})
export class HeroesModule {}