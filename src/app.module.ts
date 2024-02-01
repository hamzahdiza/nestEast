import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HeroesModule } from './hero/hero.module';

@Module({
  imports: [UserModule, HeroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
