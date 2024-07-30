import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // replace with your database host
      port: 5432, // replace with your database port
      username: 'postgres', // replace with your database username
      password: 'Guru@0005', // replace with your database password
      database: 'nestJs', // replace with your database name
      entities: [User], // Add your entities here
      synchronize: true, // Set to false in production
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule available globally
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
