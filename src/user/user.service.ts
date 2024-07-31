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

  // List Users
  async listUser(req: any) {
    try {
      console.log(req.user);
      const user = await this.usersRepository.find({});
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // User Update
  async updateUser(
    createUserDto: CreateUserDto,
    params: string,
  ): Promise<User> {
    try {
      console.log(params, 'params');
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Get User
  async getUser(id: any): Promise<any> {
    try {
      const user = await this.usersRepository.findOneBy({
        id,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Delete user
  async deleteUser(id: any): Promise<any> {
    try {
      const user = await this.usersRepository.delete({
        id,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
