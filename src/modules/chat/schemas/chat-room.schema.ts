import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { Chat } from './chat.schema';

@Schema({ timestamps: true })
export class ChatRoom extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: [User];

  @Prop({ type: Types.ObjectId, ref: 'Chat' })
  message: Chat;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
