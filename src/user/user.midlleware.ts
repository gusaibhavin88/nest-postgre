import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token: string;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else {
        throw new UnauthorizedException('No token provided');
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await this.usersRepository.findOneBy({
        id: decoded.id,
      });

      if (!currentUser) {
        throw new UnauthorizedException('User not found');
      }

      req['user'] = currentUser;
      next();
    } catch (err) {
      next(err);
    }
  }
}
