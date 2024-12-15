import {
  InternalServerErrorException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ValidationTransform implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new UnprocessableEntityException(
          error.errors.map((message) => message.message),
        );
      }
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
}
