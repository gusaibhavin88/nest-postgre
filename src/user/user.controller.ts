import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express'; // Correct import for Response
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create User
  @Post()
  @HttpCode(HttpStatus.CREATED) // Set HTTP status code to 201 Created
  async createUser(
    @Body() createUserData: CreateUserDto,
    @Res() res: Response, // Use Response type from express
  ): Promise<void> {
    // Use void as we're sending a response directly
    const user = await this.userService.createUser(createUserData);
    res.status(HttpStatus.CREATED).json({
      success: true,
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    });
  }

  // List User
  @Get()
  @HttpCode(HttpStatus.OK) // Set HTTP status code to 201 Created
  async listUser(
    @Res() res: Response, // Use Response type from express
  ): Promise<void> {
    // Use void as we're sending a response directly
    const user = await this.userService.listUser();
    res.status(HttpStatus.CREATED).json({
      success: true,
      status: HttpStatus.CREATED,
      message: 'Users fetched successfully',
      data: user,
    });
  }

  // Update User
  @Put('/:user_id')
  @HttpCode(HttpStatus.OK) // Set HTTP status code to 201 Created
  async updateUser(
    @Body() createUserData: CreateUserDto,
    @Param('user_id') user_id: string,
    @Res() res: Response, // Use Response type from express
  ): Promise<any> {
    console.log(user_id, 'vfffs');
    // Use void as we're sending a response directly
    const user = await this.userService.updateUser(createUserData, user_id);
    res.status(HttpStatus.OK).json({
      success: true,
      status: HttpStatus.OK,
      message: 'User updated successfully',
      data: {},
    });
  }

  // Get User
  @Get('/:user_id')
  @HttpCode(HttpStatus.OK) // Set HTTP status code to 201 Created
  async getUser(
    @Param('user_id') user_id: string,
    @Res() res: Response, // Use Response type from express
  ): Promise<any> {
    // Use void as we're sending a response directly
    const user: any = await this.userService.getUser(user_id);
    res.status(HttpStatus.OK).json({
      success: true,
      status: HttpStatus.OK,
      message: 'User fetched successfully',
      data: user,
    });
  }

  // Delete User
  @Delete('/:user_id')
  @HttpCode(HttpStatus.OK) // Set HTTP status code to 201 Created
  async deleteUser(
    @Param('user_id') user_id: string,
    @Res() res: Response, // Use Response type from express
  ): Promise<any> {
    // Use void as we're sending a response directly
    await this.userService.deleteUser(user_id);
    res.status(HttpStatus.OK).json({
      success: true,
      status: HttpStatus.OK,
      message: 'User deleted successfully',
      data: null,
    });
  }
}
