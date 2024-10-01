import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { ChatRoom } from './schemas/chat-room.schema';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { ChatMessageDto } from './dtos/chatMessage.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoom>,
  ) {}

  async createChatRoom(payload: CreateChatRoomDto) {
    const { users } = payload;
    await this.chatRoomModel.create({
      user: users,
      createdAt: Date.now,
    });

    return { message: 'Create chat room Success' };
  }

  async findChatRoomById(id: number | string): Promise<ChatRoom[]> {
    return await this.chatRoomModel.find().exec();
  }

  async createChat(payload: ChatMessageDto) {
    const { message, userId, chatRoomId } = payload;
    await this.chatModel.create({
      chatRoomId,
      message,
      user: userId,
      createdAt: Date.now,
    });

    return { message: 'Create chat room Success' };
  }
}
