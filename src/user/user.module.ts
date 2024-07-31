import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserMiddleware } from './user.midlleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, User],
  exports: [UserService, TypeOrmModule], // Export UserService and TypeOrmModule
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        {
          path: '/user/interceptor-request',
          method: RequestMethod.POST,
        },
        {
          path: '/user/interceptor-response/:user_id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('user');
  }
}
