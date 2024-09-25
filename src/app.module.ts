import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './modules/user/user.controller';
import { ChatController } from './modules/chat/chat.controller';
import { ChatService } from './modules/chat/chat.service';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    // MongooseModule.forRoot('mongodb://localhost:27017/chat'), // Correct MongoDB connection
    UserModule,
    ChatModule,
  ],
  controllers: [AppController, UserController, ChatController],
  providers: [AppService, UserService, ChatService],
})
export class AppModule {}
