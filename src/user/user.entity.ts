import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true ,required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['Admin', 'Manager', 'Client'] })
  role: string;

  @Prop([String])  
  refreshTokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);