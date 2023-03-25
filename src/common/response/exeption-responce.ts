import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
  @ApiProperty({
    type: 'string',
  })
  public readonly message: string;

  public constructor(exception: { message: string } | string) {
    this.message =
      typeof exception === 'object' ? exception.message : exception;
  }
}
