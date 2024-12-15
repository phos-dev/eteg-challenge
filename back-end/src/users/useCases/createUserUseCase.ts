import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/createUserDto';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserDto, Promise<User>>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: input.email,
        OR: [{ cpf: input.cpf }],
      },
    });

    if (existingUser) throw new ConflictException('Usuário já registrado');

    const user = await this.prisma.user.create({
      data: input,
    });

    return user;
  }
}
