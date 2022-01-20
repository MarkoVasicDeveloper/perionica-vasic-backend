/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDatabase } from 'config/config.database';
import { Administrator } from 'entities/Administrator';
import { RefreshToken } from 'entities/RefreshToken';
import { User } from 'entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: ConfigDatabase.database,
      port: ConfigDatabase.port,
      username: ConfigDatabase.username,
      password: ConfigDatabase.password,
      entities: [
        Administrator, RefreshToken, User
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator, RefreshToken, User
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
