import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
  ) {}

  async listUser(req: any) {
    try {
      console.log(req.user);

      // Return User entity
      const user = this.usersRepository.find();
      return user; // Return the saved user
    } catch (error) {
      // Handle specific error or rethrow as HttpException
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(
    createUserDto: CreateUserDto,
    params: string,
  ): Promise<User> {
    try {
      console.log(params, 'params');
      // Return User entitys
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user); // Save user and wait for completion
      return user; // Return the saved user
    } catch (error) {
      // Handle specific error or rethrow as HttpException
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: any): Promise<any> {
    try {
      // Retrieve a user by id
      const user = await this.usersRepository.findOneBy({
        id,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user; // Return the found user
    } catch (error) {
      // Handle error or rethrow as HttpException
      throw new HttpException('Error retrieving user', HttpStatus.BAD_REQUEST);
    }
  }

  // Delete user
  async deleteUser(id: any): Promise<any> {
    try {
      // Retrieve a user by id
      const user = await this.usersRepository.delete({
        id,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user; // Return the found user
    } catch (error) {
      // Handle error or rethrow as HttpException
      throw new HttpException('Error retrieving user', HttpStatus.BAD_REQUEST);
    }
  }
}
