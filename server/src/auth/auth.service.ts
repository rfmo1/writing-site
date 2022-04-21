import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(pass: string) {
    const match = await bcrypt.compare(
      pass,
      '$2b$10$D/IH2ZnHDkOVKkfAMpx4jOe0VPpfQ/icoKM3pWZ7ZL5LzrM9QL6YO',
    );
    return match;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
