import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Create a new user
  @Post('/signup')
  async createUser(@Body() reqBody: CreateUserDto): Promise<void> {
    try {
      const user = await this.authService.createUser(reqBody);
      throw new HttpException(
        {
          message: 'User created successfully',
          data: user,
        },
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Login User
  @Post('/login')
  async loginUser(@Body() reqBody: any): Promise<void> {
    const user = await this.authService.loginUser(reqBody);
    throw new HttpException(
      {
        message: 'User Logged in successfully',
        data: user,
      },
      HttpStatus.ACCEPTED,
    );
  }
}
