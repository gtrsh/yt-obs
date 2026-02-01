import { PipeTransform, BadRequestException } from '@nestjs/common'
import { z } from 'zod/v4'

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: z.ZodType<T>) {}

  transform(value): T {
    const result = this.schema.safeParse(value)

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: z.flattenError(result.error).fieldErrors,
      })
    }

    return result.data
  }
}
