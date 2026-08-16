import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const firstIssue = error.issues[0];
        const errorMessage = firstIssue
          ? `${firstIssue.path.join('.')}: ${firstIssue.message}`
          : 'Validation failed';

        throw new BadRequestException(errorMessage);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
