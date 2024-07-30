import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express'; // Correct import for Response
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // List User
  @Get()
  @HttpCode(HttpStatus.OK) // Set HTTP status code to 201 Created
  async listUser(
    @Req() req: any,
    @Res() res: Response, // Use Response type from express
  ): Promise<void> {
    const user = await this.userService.listUser(req);
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
    await this.userService.updateUser(createUserData, user_id);
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
