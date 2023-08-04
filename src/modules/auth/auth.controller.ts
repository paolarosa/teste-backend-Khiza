import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../user/user.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return { message: 'Email ou senha inválidos' };
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = await this.userService.createUser(user);

    return { message: 'Usuário criado com sucesso', user: createdUser };
  }
}