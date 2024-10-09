import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async createUser(createUserDto:CreateUserDto): Promise<User> {
        return this.userModel.create({
           ...createUserDto
        });
    }

    async getUser(query: any ): Promise<User> {
        return this.userModel.findOne(query);
    }
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }


    async storeRefreshToken(email: string, refreshToken: string): Promise<void> {
        const result = await this.userModel.updateOne(
            { email },
            { $addToSet: { refreshTokens: refreshToken } } 
        );

    }

    async removeRefreshToken(email: string, refreshToken: string): Promise<void> {
        const result = await this.userModel.updateOne(
            { email },
            { $pull: { refreshTokens: refreshToken } } 
        );

    }
    async updateRole(id: string, newRole: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
          throw new BadRequestException('User not found');
        }
    
        user.role = newRole;
        return user.save();
      }

    async delete(id: string): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }

}