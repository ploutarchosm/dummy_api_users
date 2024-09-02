import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRole, UserStatus } from './users.model';

@ApiTags('Users')
@ApiQuery({ name: 'search', required: false, type: String })
@ApiQuery({ name: 'role', enum: UserRole, isArray: true })
@ApiQuery({ name: 'status', enum: UserStatus, isArray: true })
@Controller('security/user')
export class UsersController {
  constructor(private readonly usersSevice: UsersService) {}

  @Get()
  async get(
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('search') search?: string,
    @Query('role') role: UserRole = UserRole.Owner,
    @Query('status') status: UserStatus = UserStatus.Active,
  ) {
    return await this.usersSevice.list(skip, take, role, status, search);
  }
}
