import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindManyOptions } from 'typeorm';
import { User } from './user.entity';

export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async users(params: FindManyOptions<User> = {}): Promise<User[]> {
    return this.usersService.findAll(params);
  }
}
