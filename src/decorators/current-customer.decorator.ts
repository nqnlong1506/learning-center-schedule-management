import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCustomer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      id: request['customer_id'],
      no: request['customer_no'],
      name: request['customer_name'],
    };
  },
);
