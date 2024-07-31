import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async jwtTokenGenerator(user: any): Promise<any> {
    const data = jwt.sign(
      {
        id: user['id'],
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );
    return data;
  }

  // Create User
  async createUser(reqBody: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: reqBody.email },
    });

    reqBody.password = await bcrypt.hash(reqBody.password, 10);
    if (user) {
      throw new HttpException(
        { message: 'User already exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const new_user = this.usersRepository.create(reqBody);
    await this.usersRepository.save(new_user);
    return new_user;
  }

  // Login User
  async loginUser(reqBody: any): Promise<any> {
    // Return User entity

    try {
      const user = await this.usersRepository.findOne({
        where: { email: reqBody.email },
      });
      const comparePassword = await bcrypt.compare(
        reqBody.password,
        user.password,
      );

      if (!comparePassword) {
        throw new HttpException(
          { message: 'Incorrect password' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!user) {
        throw new HttpException(
          { message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      const user_with_token = await this.jwtTokenGenerator(user);

      return { token: user_with_token, ...user };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
