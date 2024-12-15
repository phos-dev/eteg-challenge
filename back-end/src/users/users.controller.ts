import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/createUserUseCase';
import { CreateUserDto } from './dtos/createUserDto';
import { baseUserValidation } from './validators/createUserValidator';
import { ValidationTransform } from '../@shared/pipes/validation-transform.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  createUser(
    @Body(new ValidationTransform(baseUserValidation)) input: CreateUserDto,
  ) {
    return this.createUserUseCase.execute(input);
  }
}
