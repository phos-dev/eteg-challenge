import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from './useCases/createUserUseCase';

@Module({
  controllers: [UsersController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
