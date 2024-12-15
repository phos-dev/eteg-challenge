import { z } from 'zod';
import { isValidCpf } from '../../@shared/utils/isValidCpf';
import { UserColorEnum as PrismaUserColorEnum } from '@prisma/client';

const colorValues = Object.values(PrismaUserColorEnum) as [string, ...string[]];

export const baseUserValidation = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório' }).max(255),
  cpf: z
    .string()
    .regex(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos numéricos' })
    .refine((cpf) => isValidCpf(cpf), {
      message: 'CPF inválido',
    }),
  email: z.string().email({ message: 'Email inválido' }),
  favoriteColor: z.enum(colorValues, { message: 'Insira uma cor válida' }),
  observations: z.string().max(255).optional(),
});
