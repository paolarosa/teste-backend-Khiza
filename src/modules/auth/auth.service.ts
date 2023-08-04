import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && this.validatePassword(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  private async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  async generateToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id }; 
    return this.jwtService.sign(payload);
  }
}