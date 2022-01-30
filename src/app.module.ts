/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDatabase } from 'config/config.database';
import { Administrator } from 'entities/Administrator';
import { Message } from 'entities/Message';
import { Photo } from 'entities/Photo';
import { User } from 'entities/User';
import AdministratorController from './controller/administrator/administrator.controller';
import MailerController from './controller/mailer/mailer.controller';
import PhotoController from './controller/photo/photo.controller';
import UserController from './controller/user/user.controller';
import AdministratorService from './service/administrator/administrator.service';
import MailerService from './service/mailer/mailer.service';
import PhotoService from './service/photo/photo.service';
import UserService from './service/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: ConfigDatabase.database,
      port: ConfigDatabase.port,
      username: ConfigDatabase.username,
      password: ConfigDatabase.password,
      entities: [Administrator, User, Photo, Message],
    }),
    TypeOrmModule.forFeature([Administrator, User, Photo, Message]),
  ],
  controllers: [
    UserController,
    PhotoController,
    AdministratorController,
    MailerController,
  ],
  providers: [UserService, PhotoService, AdministratorService, MailerService],
})
export class AppModule {}
