import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
