import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { HttpExceptionFilter } from './http-exception-filter';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, HttpExceptionFilter],
})
export class AppModule {}
