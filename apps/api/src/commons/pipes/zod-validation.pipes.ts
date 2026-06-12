import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as zod from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: zod.ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues[0].message,
      });
    }

    return result.data;
  }
}
