/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDatabase } from 'config/config.database';
import { Administrator } from 'entities/Administrator';
import { Photo } from 'entities/Photo';
import { RefreshToken } from 'entities/RefreshToken';
import { User } from 'entities/User';
import AdministratorController from './controller/administrator/administrator.controller';
import PhotoController from './controller/photo/photo.controller';
import UserController from './controller/user/user.controller';
import AdministratorService from './service/administrator/administrator.service';
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
      entities: [
        Administrator, RefreshToken, User, Photo
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator, RefreshToken, User, Photo
    ])
  ],
  controllers: [
    UserController, PhotoController, AdministratorController
  ],
  providers: [
    UserService, PhotoService, AdministratorService
  ],
})
export class AppModule {}
