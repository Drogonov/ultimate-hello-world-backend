import {
  Body,
  Controller,
  Post,
  Query
} from '@nestjs/common';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Public()
  @Post('get')
  get(@Query('userId') userId: string) {
    const id = parseInt(userId, 10);
    return this.userService.getUser(id);
  }

  @Post('edit')
  edit(@Body() dto: EditUserDto) {
    console.log(dto)
    return this.userService.editUser(dto);
  }
}
