import { UserColorEnum } from '@prisma/client';

export type CreateUserDto = {
  name: string;
  cpf: string;
  email: string;
  favoriteColor: UserColorEnum;
  observations?: string;
};
