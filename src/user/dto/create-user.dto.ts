import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;


  @IsNumber()
  phone: string;

}
