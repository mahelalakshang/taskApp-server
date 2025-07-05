import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('WWW', username, pass);
    const user = await this.usersService.findByUsername(username);
    console.log('WWW', await bcrypt.compare(pass, user.password));
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log('WEEEEEEE');
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await this.usersService.create({
      username,
      password: password,
    });

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
