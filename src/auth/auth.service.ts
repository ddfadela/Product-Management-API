import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, private jwtService: JwtService) { }
        
    async validateUser(loginUserDto:LoginUserDto): Promise<any> {
        const {email,password}=loginUserDto
        const user = await this.usersService.getUser({email });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
          throw new BadRequestException('User not found');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: UserEntity) {
        const payload = { email: user.email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' }); 
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); 

        await this.usersService.storeRefreshToken(user.email, refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }


  async register(createUserDto: CreateUserDto): Promise<any> {
    const {email,password,role} = createUserDto
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
        throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await this.usersService.createUser({email, password:hashedPassword,role});
    
    return this.login({ email, password: hashedPassword }); 
}

async logout(email: string, refreshToken: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
        console.warn(`Logout attempt with invalid email: ${email}`);
        return;
    }

    await this.usersService.removeRefreshToken(email, refreshToken);
}

async refreshAccessToken(email: string, refreshToken: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.refreshTokens.indexOf(refreshToken) === -1) {
        throw new BadRequestException('Invalid refresh token');
    }

    // Validate the refresh token
    const payload = this.jwtService.verify(refreshToken);
    const newAccessToken = this.jwtService.sign({ email: payload.email }, { expiresIn: '15m' });

    return { accessToken: newAccessToken };
}

}