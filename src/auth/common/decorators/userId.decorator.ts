import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type JwtPayload = {
  email: string;
  sub: string;
};

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
