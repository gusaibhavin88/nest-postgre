import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuardFactory } from './user.guard';
import { ResponseTransformInterceptor } from './user.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // List User
  @Get()
  @UseGuards(RolesGuardFactory(['member']))
  async listUser(@Req() req: any): Promise<void> {
    const user = await this.userService.listUser(req);
    throw new HttpException(
      { message: 'Users fetched successfully', data: user },
      HttpStatus.OK,
    );
  }

  // Update User
  @Put('/:user_id')
  @UseGuards(RolesGuardFactory(['member']))
  async updateUser(
    @Body() createUserData: CreateUserDto,
    @Param('user_id') user_id: string,
  ): Promise<any> {
    await this.userService.updateUser(createUserData, user_id);
    throw new HttpException(
      { message: 'User updated successfully' },
      HttpStatus.OK,
    );
  }

  // Get User
  @Get('/:user_id')
  @UseInterceptors(ResponseTransformInterceptor)
  @UseGuards(RolesGuardFactory(['member']))
  async getUser(
    @Param('user_id') user_id: string,
    // @Res() res: Response,
  ): Promise<any> {
    const user: any = await this.userService.getUser(user_id);
    return { user: user };
    // throw new HttpException(
    //   { message: 'User fetched successfully', data: user },
    //   HttpStatus.OK,
    // );
  }

  // Delete User
  @Delete('/:user_id')
  @UseGuards(RolesGuardFactory(['admin']))
  async deleteUser(@Param('user_id') user_id: string): Promise<any> {
    await this.userService.deleteUser(user_id);
    throw new HttpException(
      { message: 'User deleted successfully' },
      HttpStatus.OK,
    );
  }
}
