import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuardFactory } from './user.guard';
import {
  RequestTransformInterceptor,
  ResponseTransformInterceptor,
} from './user.interceptor';
import { Request } from 'express';

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
  @UseGuards(RolesGuardFactory(['member']))
  async getUser(@Param('user_id') user_id: string): Promise<any> {
    const user: any = await this.userService.getUser(user_id);
    throw new HttpException(
      { message: 'User fetched successfully', data: user },
      HttpStatus.OK,
    );
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

  // Send Mail
  @Post('/send-mail')
  async sendMail(): Promise<any> {
    await this.userService.sendMail();
    throw new HttpException(
      { message: 'Mail sent successfully' },
      HttpStatus.OK,
    );
  }

  // Interceptor manipulate Response
  @Get('/interceptor-response/:user_id')
  @UseInterceptors(ResponseTransformInterceptor)
  async interceptorResponseManipulation(
    @Param('user_id') user_id: string,
  ): Promise<any> {
    const user: any = await this.userService.getUser(user_id);
    return { user: user };
  }

  // Interceptor manipulate Response
  @Post('/interceptor-request')
  @UseInterceptors(RequestTransformInterceptor)
  async interceptorRequestManipulation(@Body() reqBody: any): Promise<any> {
    return { data: reqBody };
  }
}
