import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  async validateUser(pass: string) {
    const match = await bcrypt.compare(pass, '$2b$10$.VH4XZXUjngS4jYwQFSSe.og9IFnwjQkVRHnieahe11O3DZ0Tr9mi');
    return match;
  }
}